'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import * as Tone from 'tone';
import type { voltas, StatusPiloto, Piloto } from '@/lib/type';
import { PilotDataTable } from '@/componets/corrida/TableDataPiloto';
import { getPilotColor, formatMilliseconds } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from '@/componets/ui/card';
import {Header} from "@/componets/Header";
import Button from "@/componets/ui/Buttom";
import {PlayCircle, RotateCcwIcon, PauseCircle} from "lucide-react";
//import "../../../componets/stylescorrida.css";
import { Select, SelectItem } from '@/componets/ui/select';



const INITIAL_PILOTS_NAMES = [
  'Diego Freo',
  'Marcos Paulo', 
  'Thiago Cerqueira',
  'Mário Alexandre',    
];


const PRE_LAP_WARNING_SECONDS = 15; // 15 seconds before expected lap


export default function corrida(){
    const [pilots, setPilots] = useState<Piloto[]>([]);
    const [raceTime, setRaceTime] = useState(0);
    const [ultimaVolta, setUltimaVolta] = useState<number>(0);
    const [isRaceRunning, setIsRaceRunning] = useState(false);
    const raceTimeRef = useRef<number>(0); // Ref to hold current race time for accurate lap capture
    const { toast } = useToast();
    const [idPiloto, setIdPiloto]= useState<string>('');
    const[pilotos, setPilotos] = useState<Piloto[]>([]);
    const[bateria, setBaterias] = useState<number>(0);
    const synthRef = useRef<Tone.Synth | null>(null);

     useEffect(() => {
      // Carregar pilotos do servidor quando o componente for montado
      loadPiloto();
    }, []);

    // carrega os pilotos do servidor
    async function loadPiloto(){
      try {
        const response = await fetch("http://localhost:3030/piloto");
        if (!response.ok) {
          throw new Error('Failed to fetch pilots');
        }
        const data: Piloto[] = await response.json();
        const formattedPilots = data.map((p, index) => ({
          id_piloto: String(p.id_piloto),
          nome: p.nome,
          numero_piloto: p.numero_piloto,
          status: "NORMAL" as StatusPiloto,
          voltas: [],
          steutusUltamaVolta: Date.now(),
          melhorVolta: null,
          ultimaVolta: null,
          tempoTotal: 0,
          ultimaVoltaCompleta: null,
          posicao: 0,
          cor: getPilotColor(index),
        }));
        setPilots(sortPiloto(formattedPilots));
        setPilotos(formattedPilots);
      }catch (error) {
        console.error("Falha ao carregar o piloto:", error);
        toast({ title: "Error", description: "Failed to load pilots from the server.", variant: "destructive" });
      }
    }
   

    useEffect(() => {
    // Inicialize Tone.Synth ao montar o componente após uma interação do usuário (simulada por um timeout aqui para auto-início) 
    // Em um aplicativo real, você pode colocar isso atrás de um botão "Iniciar Áudio".
      const initAudio = async () => {
        await Tone.start();
        synthRef.current = new Tone.Synth().toDestination();
      };
      initAudio();
    
      // Load initial pilots
      resetRaceState();
    }, []);

    useEffect(() => {
    if (!isRaceRunning) return;

    const checkInterval = setInterval(() => {
      const currentTime = Date.now();
      setPilots(prevPilots => 
        prevPilots.map(p => {
          let newStatus = p.status;
          // Revert 'completed' status after 20s if it's still completed
          if (p.status === "PASSOU" && currentTime - p.steutusUltamaVolta > 20000) {
            newStatus = 'NORMAL';
          }
          // Pre-lap warning
          if (p.ultimaVoltaCompleta && p.ultimaVolta) {
            const expectedTime = p.ultimaVoltaCompleta + p.ultimaVolta - (PRE_LAP_WARNING_SECONDS * 1000);
            if (raceTimeRef.current >= expectedTime && raceTimeRef.current < p.ultimaVoltaCompleta + p.ultimaVolta) {
               if(p.status !== 'ALERTA' && p.status !== 'PASSOU') newStatus = 'ALERTA';
            } else if (p.status === 'ALERTA' && raceTimeRef.current >= p.ultimaVoltaCompleta + p.ultimaVolta) {
              // If warning period passed and no lap, revert to normal (unless already completed)
              newStatus = 'NORMAL';
            }
          }
          return newStatus !== p.status ? { ...p, status: newStatus, statusTimestamp: currentTime } : p;
        })
      );
    }, 1000); // Check every second

    return () => clearInterval(checkInterval);
  }, [isRaceRunning, pilots]);


    useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    if (isRaceRunning) {
      timerId = setInterval(() => {
        setRaceTime(prevTime => {
          const newTime = prevTime + 50; // Update interval for smoother display, e.g., 50ms
          raceTimeRef.current = newTime;
          return newTime;
        });
      }, 50); // Update every 50ms
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isRaceRunning]);

    const resetRaceState = useCallback(() => {
      setIsRaceRunning(false);
      setRaceTime(0);
      raceTimeRef.current = 0;
     loadPiloto(); // Reload pilots from server

     /* const initialPilots = pilots.map((p, index) => ({
          id_piloto: String(p.id_piloto),
          nome: p.nome,
          numero_piloto: p.numero_piloto,
          status: "NORMAL" as StatusPiloto,
          voltas: [],
          steutusUltamaVolta: Date.now(),
          melhorVolta: null,
          ultimaVolta: null,
          tempoTotal: 0,
          ultimaVoltaCompleta: null,
          posicao: 0,
          cor: getPilotColor(index),
    }));
    setPilots(sortPiloto(initialPilots));
    */
    toast({ title: "Reseta Corrida", description: "Todos os dados do piloto e temporizadores foram reiniciados." });
  }, [toast]);

  const handlInpuChange = (e:any)=>{
    setIdPiloto(e.target.value);
  }

  const handleKeyDown = (event:any) =>{
     if(event.key === 'Enter'){
        handleSimulateLap(idPiloto);
        setIdPiloto('');
     }
  }

   const handleSimulateLap = useCallback((pilotIdToSimulate?: string) => {
    if (!isRaceRunning) {
      toast({ title: "Corrida não iniciada", description: "Comece a corrida para simular voltas.", variant: "destructive" });
      return;
    }
    if (pilots.length === 0) return;

    try {
      if (synthRef.current) {
        synthRef.current.triggerAttackRelease("C4", "8n", Tone.now());
      }
    } catch (error) {
      console.error("Failed to play sound:", error);
    }
    
    setPilots(prevPilots => {
      const targetPilotIndex = pilotIdToSimulate 
        ? prevPilots.findIndex(p => p.id_piloto === pilotIdToSimulate)
        : Math.floor(Math.random() * prevPilots.length);
      
      if (targetPilotIndex === -1) return prevPilots;

      const updatedPilots = prevPilots.map((pilot, index) => {
        if (index === targetPilotIndex) {
          //const rawLapTime = Math.floor(Math.random() * (120000 - 60000 + 1)) + 60000; // 60s to 120s
          const rawLapTime = Math.floor((raceTime)); // 30s to 90s
          const newLap: voltas = {
            qtVoltas: pilot.voltas.length + 1,
            tempo: raceTime, // Overall race time at lap completion
            tempoAtual: ultimaVolta, //rawLapTime, // Actual time for this specific lap
            VoltaCompleta: Date.now(), // Timestamp of lap completion
          };
          const newTotalTime = raceTime; //pilot.tempoTotal + rawLapTime;
          const UTV = pilot.ultimaVoltaCompleta ? pilot.ultimaVoltaCompleta : 0;
          const newBestLapTime = pilot.melhorVolta === null || ultimaVolta < pilot.melhorVolta ? ultimaVolta : pilot.melhorVolta ; // Update best lap time if this lap is better
          

          toast({
            title: `Lap ${newLap.qtVoltas} for ${pilot.nome}!`,
            description: `Time: ${String(Math.floor(rawLapTime % 1000)).padStart(3, '0')}.${Math.floor(rawLapTime / 1000)}s`,
          });
          setUltimaVolta ( raceTime - UTV); // Calculate last lap time based on current
          
          
          return {
            ...pilot,
            voltas: [...pilot.voltas, newLap],
            tempoTotal: newTotalTime,
            melhorVolta: newBestLapTime,
            ultimaVolta: ultimaVolta,//raceTime - raceTimeRef.current, // Time for the last lap
            status: 'PASSOU' as StatusPiloto,
            steutusUltamaVolta: Date.now(),
            ultimaVoltaCompleta: raceTimeRef.current, // Current race time, for next lap prediction
          };
        }
        return pilot;
      });
      return sortPiloto(updatedPilots);
    });
  }, [isRaceRunning, pilots, toast]);

    const sortPiloto = (pilotsToSort: Piloto[]): Piloto[] => {
    return [...pilotsToSort].sort((a, b) => {
      if (a.voltas.length !== b.voltas.length) {
        return b.voltas.length - a.voltas.length; // More laps is better
      }
      if (a.voltas.length === 0) return 0; // If no laps, order doesn't matter yet beyond this point
      return a.tempoTotal - b.tempoTotal; // Less total time is better
    }).map((p, index) => ({ ...p, position: index + 1 }));
  };

   const toggleRace = () => {
    if (!isRaceRunning && Tone.context.state !== 'running') {
      Tone.start().then(() => {
         if (synthRef.current && Tone.context.state === 'running') {
             synthRef.current.triggerAttackRelease("C5", "8n", Tone.now() + 0.1); // Test sound
         }
      });
    }
    setIsRaceRunning(!isRaceRunning);
    if (!isRaceRunning) {
      toast({ title: "Race Started!", description: "O cronômetro está funcionando agora." });
    } else {
      toast({ title: "Race Paused", description: "O cronômetro está pausado." });
    }
  };

    return(
       <div className="flex flex-col min-h-screen bg-background text-foreground continer-corrida">
        <Header />
        <main className="flex-grow container mx-auto px-2 py-4 md:px-4 md:py-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 card">     
                <Card className='bg-card shadow-lg border-red-500 border-2'>
                    <CardContent className='p-4 md:p-6'>
                        <PilotDataTable pilots={pilots}/>
                    </CardContent>'
                </Card>
            </div>
        </main>
      <footer className="text-center gap-4 py-4 text-sm text-muted-foreground border-t-2 bg-footer flex flex-row border-red-500 aling-center">
        
        <Button className="btn-corrida bg-cronometro " onClick={toggleRace}>{isRaceRunning ? <PauseCircle className="mr-2 h-5 w-5"/> :<PlayCircle className="mr-2 h-5 w-5"/> } {isRaceRunning ? 'Pausa': 'Início'}</Button>
        <Button className="btn-corrida-reset " onClick={resetRaceState}><RotateCcwIcon /> Resete</Button>
        <Select className="select-corrida w-100 border-2 border-red-500" >
          <SelectItem value="">Selecione a Categoria</SelectItem>
          {pilots.map((pilot) => (
            <SelectItem key={pilot.id_piloto} value={pilot.id_piloto}>
              {pilot.nome} 
            </SelectItem>
          ))}
        </Select>
        <Select className="select-corrida w-100 border-2 border-red-500" >
          <SelectItem value="">Selecione a Bateria</SelectItem>
          {pilots.map((pilot) => (
            <SelectItem key={pilot.id_piloto} value={pilot.id_piloto}>
              {pilot.nome} 
            </SelectItem>
          ))}
        </Select>
       
        <div className="flex justify-center items-center space-x-4 w-100 aling-height border-2 border-red-500 bg-cronometro rounded-md">
            <p className="size-cronometro color-cronometro">{formatMilliseconds(raceTime)}</p>
        </div>
         <input type="text" className="input-corrida rounded-md p-3 border-2 border-red-500 bg-cronometro text-center" onKeyDown={handleKeyDown} onChange={handlInpuChange} value={idPiloto} placeholder="ID Piloto" />
      </footer>
    </div>
    )
}