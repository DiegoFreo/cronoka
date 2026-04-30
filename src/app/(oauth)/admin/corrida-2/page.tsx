'use client';
import React,{useCallback, useEffect, useRef, useState} from "react";
import { Header } from "@/componets/Header-KAInformatica";
import Button from "@/componets/ui/Buttom";
import { PauseCircle, PlayCircle, RotateCcwIcon } from "lucide-react";
import { Card, CardContent } from "@/componets/ui/card";
import { PilotDataTable } from "@/componets/corrida/TableDataPiloto";
import {getPilotColor, formatMilliseconds } from "@/lib/utils";
import * as Tone from "tone";
import type { Piloto, Bateria, Categoria, StatusPiloto, voltas, Evento } from "@/lib/type";
import { toast } from "@/hooks/use-toast";
import { get } from "http";

const PRE_LAP_WARNING_SECONDS = 10; // Seconds before expected lap completion to trigger warning status


export default function CorridaPage() {
    const [pilots, setPilots] = useState<Piloto[]>([]);
    const [pilotosBackup, setPilotsBackup] = useState<Piloto[]>([]);
    const [selectedCategoria, setSelectedCategoria] = useState<Categoria[]>([]);
    const [bateria, setBateria] = useState<Bateria[]>([]);
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);
    const [idBateria, setIdBateria] = useState('');
    const [isRaceRunning, setIsRaceRunning] = useState(false);
    const [raceTime, setRaceTime] = useState(0);
    const [ultimaVolta, setUltimaVolta] = useState<number>(0);
    const raceTimeRef = useRef<number>(0);
    const [idPiloto, setIdPiloto] = useState('');
    const synthRef = useRef<Tone.Synth | null>(null);


     useEffect(() => {
        if (!isRaceRunning) return;
    
        const checkInterval = setInterval(() => {
          const currentTime = Date.now();
          setPilots(prevPilots => 
            prevPilots.map(p => {
              let newStatus = p.status;
              // Revert 'completed' status after 20s if it's still completed
              if (p.status === "PASSOU" && currentTime - p.statusUltimaVolta > 20000) {
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
        LoadEventos();
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

   
    useEffect(() => {
        LoadBateria();
    }, []);

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
        // Só executa se houver categorias selecionadas
        if (selectedCategoria.length > 0) {
            const categoriasIds = selectedCategoria.map(c => c._id);
            
            const filtrados = pilotosBackup.filter(piloto => 
                piloto.categorias.some(catId => categoriasIds.includes(catId))
            );
            
            setPilots(filtrados);
        } else {
            setPilots([]); // Limpa se nada estiver selecionado
        }
}, [selectedCategoria, pilotosBackup]); // Executa sempre que um desses dois mudar

  const LoadEventos = async () => {
        try {
          const response = await fetch("/api/evento");
            const data = await response.json();
            setEventos(data);
            console.log("Eventos carregados:", data);
            
        } catch (error) {
          console.error("Erro ao buscar eventos:", error);
        }
    }

    const LoadBateria = async () => {
      console.log("Carregando baterias para o evento:", selectedEvento);
        try {
          bateria.length === 0 && setBateria(selectedEvento?.baterias || []); // Carrega as baterias do evento selecionado, se disponível
        } catch (error) {
          console.error("Erro ao buscar baterias:", error);
        }
     }

    /*
    const LoadBateria = async () => {
        try {
          const response = await fetch("/api/bateria");
            const data = await response.json();
            setBateria(data);
        } catch (error) {
          console.error("Erro ao buscar baterias:", error);
        }   
    }*/

    const LoadCategoriasBateria = async (idBateria: string) => {
        setIdBateria(idBateria);
        if (!idBateria) {
            setSelectedCategoria([]);
            setPilots([]);
            return;
        }
        try {
          const response = await fetch(`/api/bateria/${idBateria}`);
            const data = await response.json();
            setSelectedCategoria(data.data.categorias);            
            LoadPiloto();
        } catch (error) {
          console.error("Erro ao buscar categorias da bateria:", error);
        }
    }
   const LoadPiloto = async () => {
        try {
          const response = await fetch("/api/piloto");
            const data = await response.json();
            const pilotosComCor = data.map((piloto: Piloto) => ({
                nome: piloto.nome,
                numero_piloto: piloto.numero_piloto,
                categorias: piloto.categorias,
                status: 'NORMAL' as StatusPiloto,
                voltas: [],
                ultimaVolta: null,
                melhorVolta: null,
                tempoTotal: 0,
                cor: getPilotColor(piloto.numero_piloto)
            }));
            setPilots(pilotosComCor);
            
            setPilotsBackup(pilotosComCor);
            ListarPilotosCategoria();
        } catch (error) {
          console.error("Erro ao buscar pilotos:", error);
        }
    }
    function ListarPilotosCategoria() {
        if (selectedCategoria.length === 0) {
        toast({ 
            title: "Nenhuma categoria selecionada", 
            description: "Por favor, selecione uma categoria.", 
            variant: "destructive" 
        });
        return;
    }

    // Criamos um Set com os IDs das categorias selecionadas para busca rápida
    const idsCategoriasSelecionadas = new Set(selectedCategoria.map(c => c._id));

    // Filtramos os pilotos: "Retorne o piloto se ALGUMA categoria dele estiver no meu Set"
    const filtrados = pilotosBackup.filter(piloto => 
        piloto.categorias.some(idCatPiloto => idsCategoriasSelecionadas.has(idCatPiloto))
    );

    setPilots(filtrados);
    }


    const toggleRace = () => {
          if (!isRaceRunning && Tone.context.state !== 'running'  && pilots.length > 0) {
            Tone.start().then(() => {
             if (synthRef.current && Tone.context.state === 'running') {
                 synthRef.current.triggerAttackRelease("C5", "8n", Tone.now() + 0.1); // Test sound
             }
          });
        }else if (!isRaceRunning && pilots.length === 0) {
          toast({ title: "No Pilots", description: "Load pilots before starting the race.", variant: "destructive" });
          return;
        }
        setIsRaceRunning(!isRaceRunning);
        if (!isRaceRunning) {
        toast({ title: "Race Started!", description: "O cronômetro está funcionando agora." });
        } else {
        toast({ title: "Race Paused", description: "O cronômetro está pausado." });
        }
    }

   const resetRaceState = useCallback(() => {
         setIsRaceRunning(false);
         setRaceTime(0);
         raceTimeRef.current = 0;   
       toast({ title: "Reseta Corrida", description: "Todos os dados do piloto e temporizadores foram reiniciados." });
     }, [toast]);

    function handleKeyDown(event: any): void {
        if (event.key === 'Enter') {
            handleSimulateLap(idPiloto);
            setIdPiloto('');
        }
    }

    function handleInputChange(event:any): void {
        setIdPiloto(event.target.value);
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
              const largada = pilot.largada ? pilot.largada : raceTime - rawLapTime; // Set start time if not already set
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
                melhorVolta: newBestLapTime || pilot.melhorVolta,
                ultimaVolta: ultimaVolta, //raceTime - raceTimeRef.current, // Time for the last lap
                status: 'PASSOU' as StatusPiloto,
                statusUltimaVolta: Date.now(),
                ultimaVoltaCompleta: raceTimeRef.current, // Current race time, for next lap prediction
              };
            }
            //voltarApi(pilot.voltas[pilot.voltas.length -1]);
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

     return (
        <div className="bg-black text-white min-h-screen">    
            <Header categoria={selectedCategoria.map((cat) => cat.nome+", ")} />        
            <main className="p-10 flex flex-row w-full h-full gap-10">
                
                <div className="flex flex-col items-center gap-4 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 card">     
                        <Card className='bg-card shadow-lg border-red-500 border-2'>
                            <CardContent className='p-4 md:p-6'>
                                <PilotDataTable pilots={pilots} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="flex flex-col items-center fixed-right right-0 top-0 border p-10 rounded-lg border-red-500 w-40 font-bold gap-4">
                    <div className="item-center flex flex-col border-b border-red-500 py-10 " >
                        <h1 className="text-lg text-center">Cronômetro</h1>
                        <p className="text-2xl">{formatMilliseconds(raceTime)}</p>
                        <p>{idPiloto}</p>
                    </div>
                    <div className="item-center flex flex-col border-b w-full border-red-500 py-10 " >
                        <h1 className="text-sm text-center">Bateria</h1>
                        <p className="text-sm text-center">{bateria.find((b:any) => b._id === idBateria)?.nome || '-'}</p>
                    </div>
                </div>
            </main>
            <footer className="py-4 px-6 md:px-8 flex flex-row border-t-2 border-red-500 items-center bg-card shadow-md text-center fixed bottom-0 w-full gap-4 p-10">
                <Button className="btn-corrida bg-cronometro border-2 border-green-500" onClick={toggleRace}>{isRaceRunning ? <PauseCircle className="mr-2 h-5 w-5"/> :<PlayCircle className="mr-2 h-5 w-5"/> } {isRaceRunning ? 'Pausa': 'Início'}</Button>
                <Button className="btn-corrida-reset " onClick={resetRaceState}><RotateCcwIcon /> Resete</Button>
                <select className="select-corrida w-80  focus:outline-none focus:ring-red-500 rounded-lg border-2 border-red-500" value={selectedEvento?._id || ''} onChange={(e) => {
                    const eventoSelecionado = eventos.find(ev => ev._id === e.target.value) || null;
                    setSelectedEvento(eventoSelecionado);
                    console.log("Evento selecionado:", eventoSelecionado);
                    setBateria(eventoSelecionado?.baterias || []);                    
                    LoadBateria();
                }}>
                    <option value="">Selecione o Evento</option>
                    {eventos.map((evento:any) => (
                        <option key={evento._id} value={evento._id}>{evento.nome_evento}</option>
                    ))}
                </select>
                <select className="select-corrida w-80  focus:outline-none focus:ring-red-500 rounded-lg border-2 border-red-500" value={idBateria} onChange={(e) => LoadCategoriasBateria(e.target.value)}>
                    <option value="">Selecione a Bateria</option>
                    {bateria.map((bateria:any) => (
                        <option key={bateria._id} value={bateria._id}>{bateria.nome}</option>
                    ))}
                </select>
                <input type="text" className=" rounded-lg p-10 text-center border-2 border-red-500 focus:outline-none focus:ring-red-500" onKeyDown={handleKeyDown} onChange={handleInputChange} value={idPiloto} placeholder="Piloto" />
            </footer>
        </div>
    );
}