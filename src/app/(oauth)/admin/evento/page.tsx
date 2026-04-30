'use client';
<<<<<<< HEAD
import React, { useState, useEffect, useContext, use } from "react";
import { useRouter } from "next/navigation";
import Button from "@/componets/ui/Buttom";
import {Home, User, UserPen, Tag, SquareCheckBig, ChartSpline, Flag, ChartNoAxesColumnIncreasing, ClipboardList, Settings, Medal, Car, Trophy} from "lucide-react";
import { AuthContext } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/componets/ui/card";
import ListarEventos from "@/componets/listas/LiatarEventos";
import ConfigEvento from "@/componets/cadastro/ConfigEvento";

interface Evento {
    _id: string;
    nome_evento: string;
    descricao_evento: string;
    data_inicio: string;
    data_fim: string;
    hora_evento: string;
    local_evento: string;
}

const EventoPage = () => {
    const router = useRouter();
    const logout = useContext(AuthContext).logout;
    const [imgUsuario, setImgUsuario] = useState<string>('');
    const[isOpen, setIsOpen] = useState(false);
    const [formModal, setFormModal] = useState('');
    const user = useContext(AuthContext).users;
    const [eventos, setEventos] = useState<Evento[]>([]);
    
    useEffect(() => {
        if (user?.avatarUser) {
            setImgUsuario(user.avatarUser);
        }
        console.log(user?.avatarUser);
    }, [user]);

    useEffect(() => {
        fetchEventos();
    }, []);


    const fetchEventos = async () => {
        try {
            const response = await fetch("/api/evento");
            const data = await response.json();
            setEventos(data);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
        }
    };
    function EventosMes() {
        const eventosNoMes = eventos.filter((evento) => {
          const dataInicio = new Date(evento.data_inicio);
          const dataFim = new Date(evento.data_fim);
          const hoje = new Date();

            return (dataInicio.getMonth() === hoje.getMonth() && dataInicio.getFullYear() === hoje.getFullYear()) ||
                   (dataFim.getMonth() === hoje.getMonth() && dataFim.getFullYear() === hoje.getFullYear());
        });
    
        return eventosNoMes.length;
    }
    function EventosAno() {
        const eventosNoAno = eventos.filter((evento) => {
          const dataInicio = new Date(evento.data_inicio);
          const dataFim = new Date(evento.data_fim);
          const hoje = new Date();

            return (dataInicio.getFullYear() === hoje.getFullYear()) ||
                   (dataFim.getFullYear() === hoje.getFullYear());
        });
            
        return eventosNoAno.length;
    }


    const hendleAdicionarEvento = () => {
        setIsOpen(isOpen ? false : true);
        setFormModal('evento');
    }
    const hendleListarEventoMes = () => {
        setIsOpen(isOpen ? false : true);
        setFormModal('listarMes');
    }
    const hendleListarEventoAno = () => {
        setIsOpen(isOpen ? false : true);
        setFormModal('listarAno');
    }

        const handleFormModal = () => {
            if (isOpen && formModal === 'evento') {
            return <ConfigEvento  />;
            }
        }

    return(
        <div className="continerdashboard">
           
=======
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/componets/Modal";;
import Button from "@/componets/ui/Buttom";
import {Home, User, UserPen, Tag, SquareCheckBig, ChartSpline, Flag, ChartNoAxesColumnIncreasing, ClipboardList, Settings, Medal} from "lucide-react";
import { AuthContext } from "@/contexts/AuthContext";

import '@/componets/styles.css';
//import '@/componets/stylescorrida.css';
import '@/componets/dashboard.css';
import { Card, CardContent } from "@/componets/ui/card";



const EventoPage = () => {
    const router = useRouter();
     const logout = useContext(AuthContext).logout;
     const [imgUsuario, setImgUsuario] = useState<string>('');


    return(
        <div className="continerdashboard">
>>>>>>> ee9061d718d7003358dff4b156bbd5e7f07b5640
            <div className="continerdashboard-left">
            <div className="continerdashboard-logo">
                <img
                alt="logo"
                src="../FPMX-logo.png"
                className="mx-auto h-15 w-auto"
                />
            </div>
            <div className="continerdashboard-menu pt-2">
                <ul>
                <li onClick={()=>{router.push("../admin")} } className='flex flex-row items-center btn'><Home className="pr-2"/>Home</li>
                <li onClick={()=>{router.push("../admin/competidor")}} className="flex flex-row items-center btn "><User  className="pr-2"/>Competidores</li>
                <li onClick={()=>{router.push("../admin/usuario")}} className="flex flex-row items-center btn"><UserPen  className="pr-2"/>Usuário</li>
                <li onClick={()=>{router.push("../admin/categoria")}} className="flex flex-row items-center btn"><Tag className="pr-2"/>Categoria</li>
                <li onClick={()=>{router.push("../admin/bateria")}} className="flex flex-row items-center btn"><SquareCheckBig className="pr-2" />Bateria</li>
                <li onClick={()=>{router.push("../admin/evento")}} className="flex flex-row items-center btn active"><ChartSpline className="pr-2" />Eventos</li>
                <li onClick={()=>{router.push("../admin/tag")}} className="flex flex-row items-center btn"><Flag className="pr-2" />TAGs</li>
                <li onClick={()=>{router.push("../admin/relatorio")}} className="flex flex-row items-center btn"><ChartNoAxesColumnIncreasing className="pr-2" />Relatório</li>
                <li onClick={()=>{}} className="flex flex-row items-center btn"><ClipboardList className="pr-2" />Licenças</li>
                <li onClick={()=>{router.push("../admin/prova")}} className="flex flex-row items-center btn"><Settings className="pr-2" />Configurações</li>
                <li onClick={() => window.open("../admin/corrida", "_blank")} className="flex flex-row items-center btn"><Medal className="pr-2" />Inciar Corrida</li>
                </ul>
            </div>
            
            <div className="continerdashboard-logout pt-4">
                <div className="continerdashboard-logout-perfill">
                <Button className="bg-cronometro btn-corrida" onClick={()=>{logout()}}>Sair</Button>
                <img
                    alt="perfil"
                    src= {imgUsuario ? imgUsuario : "../logoka.svg"}
                    className="mx-auto h-15 w-auto"
                />
                </div>
            </div>
            </div>
<<<<<<< HEAD
            <div className="flex-1 p-10 flex flex-col gap-4">
                <Card className=" mt-2 p-10 continerdashboard-border continerdashboard-title bg-tranparente-30" >
                        <CardContent className="items-center justify-center p">  
                            <h2 className="text-2xl  font-bold mb-4">Eventos</h2>
                        </CardContent>
                 </Card>
                <div className="gap-4 flex flex-row item-center  justify-between">                    
                    <Card className=" mt-2 p-10 continerdashboard-border btn bg-tranparente-30" onClick={()=>{hendleAdicionarEvento()}} >
                        <CardContent className="flex flex-col items-center justify-center">
                            <Trophy className="mb-4" size={48} color="#ffffff" />  
                            <h2 className="text-2xl  font-bold mb-4">Criar evento</h2>
                            <p className="text-center text-gray-500">Utimos  eventos criados</p>
                        </CardContent>
                    </Card>
                    <Card className=" mt-2 p-10 continerdashboard-border btn bg-tranparente-30" onClick={()=>{hendleListarEventoMes()}} >
                        <CardContent className="flex flex-col items-center justify-center">  
                            <ChartSpline className="mb-4" size={48} color="#ffffff" />
                            <h2 className="text-2xl  font-bold mb-4">Evento no Mês</h2>
                            <p className="text-center text-gray-500">{EventosMes()} - eventos</p>
                        </CardContent>
                    </Card>
                    <Card className=" mt-2 p-10 continerdashboard-border btn bg-tranparente-30" onClick={()=>{hendleListarEventoAno()}} >
                        <CardContent className="flex flex-col items-center justify-center">  
                            <Flag className="mb-4" size={48} color="#ffffff" />
                            <h2 className="text-2xl  font-bold mb-4">Eventos no Ano</h2>
                            <p className="text-center text-gray-500">{EventosAno()} - eventos</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="gap-4 flex flex-col item-center justify-between mt-4 bgdark p-10 rounded">
                    {isOpen &&  (
                        <div className="flex flex-col gap-4 mt-4 ">
                            {formModal === 'evento' &&(
                                <ConfigEvento />
                            )}
                            {formModal === 'listarAno' &&(
                                <ListarEventos tipo="listarAno" />
                            )}
                            {formModal === 'listarMes' &&(
                                <ListarEventos tipo="listarMes" />
                            )}
                        </div>
                    )}
                    <div className="continerdashboard-footer ka-modal-footer">
                        <p className="text-center text-gray-500">© 2024 Cronoka. Todos os direitos reservados.</p>
                    </div>
                </div>
            </div>
               
            </div>
=======
            <div className="continerdashboard-right gap-4 flex-wrap justify-starth">
                 <Card className=" mt-2 p-10 continerdashboard-border continerdashboard-title bg-tranparente-30" >
                    <CardContent className="flex flex-col items-center justify-center">  
                        <h2 className="text-2xl  font-bold mb-4">Eventos</h2>
                    </CardContent>
                </Card>

            </div>
        </div>
>>>>>>> ee9061d718d7003358dff4b156bbd5e7f07b5640

        
    )
}
export default EventoPage;