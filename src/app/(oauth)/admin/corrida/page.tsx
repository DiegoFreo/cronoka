'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import * as Tone from 'tone';
import type { voltas, StatusPiloto, Piloto, Bateria, Categoria } from '@/lib/type';
import { PilotDataTable } from '@/componets/corrida/TableDataPiloto';
import { getPilotColor, formatMilliseconds } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from '@/componets/ui/card';
import {Header} from "@/componets/Header";
import Button from "@/componets/ui/Buttom";
import {PlayCircle, RotateCcwIcon, PauseCircle} from "lucide-react";
import "@/componets/stylescorrida.css";
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
    //const[pilotos, setPilotos] = useState<Piloto[]>([]);
    const[bateria, setBaterias] = useState<Bateria[]>([]);
    const[categoria, setCategoria] = useState<Categoria[]>([]);
    const [selectedBateria, setSelectedBateria] = useState<string>('');
    const [selectedCategoria, setSelectedCategoria] = useState<string>('');
    const [selectedNomeBateria, setSelectedNomeBateria] = useState<string>('');
    const [selectedNomeCategoria, setSelectedNomeCategoria] = useState<string>('');
    const synthRef = useRef<Tone.Synth | null>(null);

     useEffect(() => {
      // Carregar pilotos do servidor quando o componente for montado
      loadPiloto(selectedCategoria || '');
      loadBateria();
      loadCategoria();
    }, []);

    // carrega os pilotos do servidor
    async function loadPiloto(id: string){
      try {
        
        const response = await fetch(`/api/categoria/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch pilots');
        }
        //const data: Piloto[] = await response.json();
       // const {data: {pilotos} } = await response.json();
       const dataPiloto = await response.json();
       const pilotos = dataPiloto.data?.pilotos || [];
        console.log("Pilotos carregados:", dataPiloto.data?.pilotos || [] );
                
        const formattedPilots = pilotos.map((p: Piloto, index: number) => ({
          _id: String(p._id),
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
        
        setPilots(formattedPilots);
        //setPilotos(formattedPilots);
      }catch (error) {
        console.error("Falha ao carregar o piloto:", error);
        toast({ title: "Error", description: "Failed to load pilots from the server.", variant: "destructive" });
      }
    }

    // buscar as bateria do servidor
    async function loadBateria(){
      try {
        const response = await fetch("/api/bateria");
        if (!response.ok) {
          throw new Error('Failed to fetch bateria');
        }
        const data = await response.json();
        setBaterias(data);
      }catch (error) {
        console.error("Falha ao carregar a bateria:", error);
        toast({ title: "Error", description: "Failed to load bateria from the server.", variant: "destructive" });
      }
    }
    //busca as categorias do servidor
    async function loadCategoria(){
      try {
        const response = await fetch("/api/categoria");
        if (!response.ok) {
          throw new Error('Failed to fetch categoria');
        }
        const data = await response.json();
        setCategoria(data);
      }catch (error) {
        console.error("Falha ao carregar a categoria:", error);
        toast({ title: "Error", description: "Failed to load categoria from the server.", variant: "destructive" });
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
     loadPiloto(selectedCategoria); // Reload pilots from server

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
        ? prevPilots.findIndex(p => p.numero_piloto === Number(pilotIdToSimulate))
        : Math.floor(Math.random() * prevPilots.length) && alert("Piloto não encontrado!");

      if (targetPilotIndex === -1) return prevPilots;

      const updatedPilots = prevPilots.map((pilot, index) => {
        if (index === targetPilotIndex) {
          //const rawLapTime = Math.floor(Math.random() * (120000 - 60000 + 1)) + 60000; // 60s to 120s
          //const rawLapTime = Math.floor((raceTime)); // 30s to 90s
          const rawLapTime = raceTimeRef.current - (pilot.ultimaVoltaCompleta ? pilot.ultimaVoltaCompleta : 0);
          const ultimaVolta = rawLapTime;

          const newLap: voltas = {
            qtVoltas: pilot.voltas.length + 1,
            tempo: raceTime, // Overall race time at lap completion
            tempoAtual: rawLapTime, // Actual time for this specific lap ultimaVolta, //
            VoltaCompleta: Date.now(), // Timestamp of lap completion
          };
          const newTotalTime = pilot.tempoTotal + rawLapTime; //raceTime; 
          const UTV = pilot.ultimaVoltaCompleta ? pilot.ultimaVoltaCompleta : rawLapTime;
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
            ultimaVolta: ultimaVolta, //raceTime - raceTimeRef.current, // Time for the last lap
            status: 'PASSOU' as StatusPiloto,
            steutusUltamaVolta: Date.now(),
            ultimaVoltaCompleta: raceTimeRef.current, // Current race time, for next lap prediction
          };
        }
        voltarApi(pilot.voltas[pilot.voltas.length -1]);
        return pilot;
      });
      return sortPiloto(updatedPilots);
    });
  }, [isRaceRunning, pilots, toast]);
  
  async function voltarApi(voltaData: voltas){
    
    try {
      const response = await fetch('/api/volta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voltaData),
      });
      if (!response.ok) {
        throw new Error('Failed to save lap data');
      }
      const data = await response.json();
      console.log('Lap data saved successfully:', data);
    } catch (error) {
      console.error('Error saving lap data:', error);
    }
  }
  

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
  const handleBateriaChange = (value: string) => {
    setSelectedBateria(value); 
    
  }
  const handleCategoriaChange = (value: string) => {
    setSelectedCategoria(value);  
    loadPiloto(value);
  }

    return(
       <div className="flex flex-col min-h-screen bg-background text-foreground continer-corrida">
        <Header bateria={selectedNomeBateria} categoria={selectedNomeCategoria} />
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
        <Select className="select-corrida w-100 border-2 border-red-500" value={selectedCategoria} onChangeCapture={(e) => handleCategoriaChange(e.currentTarget.value)} >
          <SelectItem value="">Selecione a Categoria</SelectItem>
          {categoria.map((cat, key) => (
              <SelectItem key={key} value={cat._id}>
                {cat.nome}
              </SelectItem>
            ))}
        </Select>
        <Select className="select-corrida w-100 border-2 border-red-500"defaultValue={selectedBateria} onChange={(e) => handleBateriaChange(e.currentTarget.value)}>
          <SelectItem value="">Selecione a Bateria</SelectItem>
         {bateria.map((bat, key) => (
            <SelectItem key={key} value={bat._id}>
              {bat.nome} 
            </SelectItem>
          ))}

        </Select>
       
        <div className="flex justify-center items-center space-x-4 w-100 aling-height border-2 border-red-500 bg-cronometro rounded-md">
            <p className="size-cronometro color-cronometro">{formatMilliseconds(raceTime)}</p>
        </div>
         <input type="text" className="input-corrida rounded-md p-3 border-2 border-red-500 bg-cronometro text-center" onKeyDown={handleKeyDown} onChange={handlInpuChange} value={idPiloto} placeholder="Piloto" />
      </footer>
    </div>
    )
}