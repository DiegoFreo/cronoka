
import React,{useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import { FaClosedCaptioning, FaWindowClose } from "react-icons/fa";
import Button from "../ui/Buttom";
import ConfigEvento from "../cadastro/ConfigEvento";
import { set } from "mongoose";
import { formatDateToIso } from "../ui/FormatarData";
import Bateria from "../cadastro/Bateria";
import Modal from "../Modal";

interface Evento {
    _id: string;
    nome_evento: string;
    descricao_evento: string;
    data_inicio: string;
    data_fim: string;
    hora_evento: string;
    local_evento: string;
}
interface Bateria {
    _id: string;
    nome: string;
    hora_inicio: string;
    hora_fim: string;
    categorias: Categoria[];
}
interface Categoria {
    _id: string;
    nome: string;   
}

export default function ListarEventos({tipo}: {tipo: string}) {
    const {register, handleSubmit, reset, setValue} = useForm();
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [baterias, setBaterias] = useState<Bateria[]>([]);
    const [idBateria, setIdBateria] = useState<string>('');
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenBateria, setIsOpenBateria] = useState(false);
    const [formModal, setFormModal] = useState('');
    const [titleModal, setTitleModal] = useState('');

    useEffect(() => {
        fetchEventos();
        fetchBaterias();
        fetchCategorias();
    }, []);



    const hendleEditaEvento = (id: string) => {
       const evento = eventos.find((evento) => evento._id === id);
        
        setIsOpen(isOpen ? false : true); 
        setFormModal('evento');
        setTitleModal('Editar Evento');
        setValue("nomeEvento", evento?.nome_evento ?? '');
        setValue("descricaoEvento", evento?.descricao_evento ?? '');
        setValue("dataInicio", formatDateToIso(evento?.data_inicio));
        setValue("dataFim", formatDateToIso(evento?.data_fim));
        setValue("horaEvento", evento?.hora_evento ?? '');
        setValue("localEvento", evento?.local_evento ?? '');
    }

    const fetchCategorias = async () => {
        try {
            const response = await fetch("/api/categoria/");
            const data = await response.json();
            setCategorias(data);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    };

    const fetchEventos = async () => {
        try {
            const response = await fetch("/api/evento");
            const data = await response.json();
            setEventos(data);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
        }
    };
    const fetchBaterias = async () => {
        try {
            const response = await fetch("/api/bateria");
            const data = await response.json();
            setBaterias(data);
        } catch (error) {
            console.error("Erro ao buscar baterias:", error);
        }
    };
    function filtroEventos(tipo: string) {
        const hoje = new Date();
        if (tipo === 'listarMes') {
            return eventos.filter((evento) => {
                const dataInicio = new Date(evento.data_inicio);
                const dataFim = new Date(evento.data_fim);

                return (dataInicio.getMonth() === hoje.getMonth() && dataInicio.getFullYear() === hoje.getFullYear()) ||
                       (dataFim.getMonth() === hoje.getMonth() && dataFim.getFullYear() === hoje.getFullYear());
            });
        }
        if (tipo === 'listarAno') {
            return eventos.filter((evento) => {
                const dataInicio = new Date(evento.data_inicio);
                const dataFim = new Date(evento.data_fim);

                return (dataInicio.getFullYear() === hoje.getFullYear()) ||
                       (dataFim.getFullYear() === hoje.getFullYear());
            });
        }
        return eventos;
    }

    const hendleBateria = () => {
        setIsOpenBateria(isOpenBateria ? false : true);
        setTitleModal('Adicionar Bateria');
    }


    function handleFormModal() {
        if(titleModal === 'Adicionar Bateria'){
            if(isOpenBateria){
                 return <Bateria  />;
            }           
        }
    }

    return (
        <>
        <Modal isOpen={isOpenBateria} Titulo={titleModal} setOpenModal={()=>setIsOpenBateria(!isOpenBateria)}>
            {handleFormModal()}
        </Modal>
        <div className="flex flex-row flex-wrap gap-4 border-red-700 border-t-2 p-10 ">
            {eventos.length === 0 ? (
                <p className="text-center text-gray-500">Nenhum evento encontrado.</p>
            ) : (  
                filtroEventos(tipo).map((evento) => (
                    <Card key={evento._id} className="w-64 gap-4 p-10 border border-red-700 rounded-xl btn" onClick={() => {hendleEditaEvento(evento._id)}}>
                        <CardContent className=" flex flex-col p-4">
                            <h3 className="text-xl font-bold">{evento.nome_evento}</h3>
                            <p className="text-gray-600">{evento.descricao_evento}</p>
                            <p className="text-sm text-gray-500">
                                Data de início: {new Date(evento.data_inicio).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                                Data de fim: {new Date(evento.data_fim).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">Hora: {evento.hora_evento}</p>
                        </CardContent>
                    </Card>
                ))

            )}
            

        </div>
        <div className="w-full p-10 flex flex-col items-center justify-center border border-dashed border-gray-400 rounded-xl cursor-pointer">
                <div className="border-b border-dashed border-gray-400 w-full mb-4 justify-center items-center flex flex-row gap-2">
                    <p className="text-white  ">Editar Evento</p>
                </div>
                {isOpen && (
                    formModal === 'evento' && 
            <div className="flex flex-row w-full gap-4">
                <form className="flex flex-col w-50  gap-4 mt-4" onSubmit={handleSubmit((data) => console.log(data))}>
                    <div className="flex flex-row  gap-2">
                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="nomeEvento">Nome do Evento</label>
                            <input type="text" id="nomeEvento" className="ka-input" {...register("nomeEvento")} />
                        </div>
                    </div>
                        <div className="flex flex-col  gap-2">
                            <label htmlFor="descricaoEvento">Descrição do Evento</label>
                            <textarea id="descricaoEvento" className="ka-input" {...register("descricaoEvento")}/>
                        </div>
                    
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-col w-50 gap-2">
                            <label htmlFor="dataInicio">Data de Início</label>
                            <input type="date" id="dataInicio" className="ka-input" {...register("dataInicio")} />
                        </div>
                        <div className="flex flex-col w-50 gap-2">
                            <label htmlFor="dataFim">Data de Fim</label>
                            <input type="date" id="dataFim" className="ka-input" {...register("dataFim", { valueAsDate: true })} />
                        </div>
                    </div>
                    <div className="flex flex-row  gap-2">
                        <div className="flex flex-col w-50 gap-2">
                            <label htmlFor="horaEvento">Hora do Evento</label>
                            <input type="time" id="horaEvento" className="ka-input" {...register("horaEvento")} />
                        </div>
                        <div className="flex flex-col w-50 gap-2">
                            <label htmlFor="localEvento">Local do Evento</label>
                            <input type="text" id="localEvento" className="ka-input" {...register("localEvento")} />
                        </div>
                    </div>
                    <div className="ka-modal-footer">
                        <Button className="btn btn-green" onClick={handleSubmit((data) => console.log(data))}>Salvar</Button>
                        <Button className="btn btn-corrida-reset" onClick={() => reset()}>Limpar</Button>
                    </div>
                </form>
                <div className="p-10 w-50">
                    <label className="text-xl font-bold mb-4">Baterias</label>
                    <Card className="p-10">
                        <CardContent className="flex flex-col gap-2">
                            {baterias.map((bateria) => (
                                <div key={bateria._id} className="flex flex-row justify-between items-center text-white">
                                    <input type="checkbox" onChange={() => setIdBateria(bateria._id)} />
                                    <p>{bateria.nome}</p>
                                    <Button className="btn " onClick={() => console.log("Remover bateria", bateria.nome)}><FaWindowClose/></Button>
                                </div>                               
                            ))}
                        </CardContent>
                    </Card>
                    <div className="flex grid grid-flow-col justify-items-end gap-2 mt-4">
                        <Button className="btn btn-green mb-4 " onClick={() => hendleBateria()}>Adicionar bateria</Button>
                    </div>
                </div>
            </div>
                )}

        </div>
        </>
    )
}