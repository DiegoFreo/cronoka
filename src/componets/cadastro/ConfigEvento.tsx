'use client';
import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Buttom";
import Modal from "../Modal";
import Bateria from "./Bateria";
import { Card, CardContent } from "../ui/card";
import { FaWindowClose } from "react-icons/fa";

interface Bateria {
    _id: string;
    nome: string;  
    hora_inicio: string;
    hora_fim: string;
    categorias: Categoria[];
}
interface Categoria {
    _id: string;
    nome_categoria: string;
    descricao_categoria: string;    
}
interface Evento {
    _id: string;
    nome_evento: string;
    descricao_evento: string;
    data_inicio: string;
    data_fim: string;
    hora_evento: string;
    local_evento: string;
}

export default function ConfigEvento() {
    const { register, handleSubmit, reset} = useForm();
    const [baterias, setBaterias] = useState<Bateria[]>([]);
    const [bateriaSelecionada, setBateriaSelecionada] = useState<Bateria[] | null>(null);
    const [idBateria, setIdBateria] = useState<string>('');
    const [linhasSelecionadas, setLinhasSelecionadas] = useState<number[]>([]);
    //const [evento, setEvento] = useState<Evento[]>([]);
    const [categorias, setCategorias] = useState([]);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [titleModal, setTitleModal] = React.useState<string>('');


    useEffect(() => {
        fetchBaterias();
        fetchCategorias();
    }, []);

    const fetchBaterias = async () => {
        try {
            const response = await fetch("/api/bateria");
            const data = await response.json();
            setBaterias(data);
        } catch (error) {
            console.error("Erro ao buscar baterias:", error);
        }
    };

    const fetchCategorias = async () => {
        try {
            const response = await fetch("/api/categoria");
            const data = await response.json();
            setCategorias(data);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    };
    const handleLinhaSelecionada = (index: number) => {
        if (linhasSelecionadas.includes(index)) {
            setLinhasSelecionadas(linhasSelecionadas.filter((i) => i !== index));

            setBateriaSelecionada(bateriaSelecionada?.filter((bateria) => bateria._id === baterias[index]._id) || null);

        } else {
            setLinhasSelecionadas([...linhasSelecionadas, index]);
            baterias.map((bateria) => {
                if (bateria._id === baterias[index]._id) {
                    setBateriaSelecionada((prev) => prev ? [...prev, bateria] : [bateria]);
                }
            });

        }
    };

    const handleAdicionarBateria = () => {
        setTitleModal('Adicionar Bateria');
        setIsOpen(true);
    }
    function handleFormModal() {
        if(titleModal === 'Adicionar Bateria'){
            if(isOpen){
                 return <Bateria  />;
            }           
        }
    }
    async function hendleSubmit (data: any) {
        const dados = {
            nome_evento: data.nomeEvento,
            descricao_evento: data.descricaoEvento,
            data_inicio: data.dataInicio,
            data_fim: data.dataFim,
            hora_evento: data.horaEvento,
            local_evento: data.localEvento,
            baterias: bateriaSelecionada?.map((bateria) => bateria._id),
        };
        
        console.log(dados);

        const response = await fetch("/api/evento", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),

        });
        if (!response.ok) {           
            console.log("Erro ao criar evento!", response.statusText);
            reset();
        } else {
            console.error("Evento criado com sucesso!");
        }
};
       

    return (
        <div className="w-full p-10 flex flex-col items-center justify-center border border-dashed border-red-600 rounded-xl cursor-pointer">
            <Modal isOpen={isOpen} Titulo={titleModal} setOpenModal={()=>setIsOpen(!isOpen)}>
                {handleFormModal()}
            </Modal>
             <label className="text-2xl font-bold mb-4">Configurações do Evento</label>
            <div className="flex flex-row gap-4 mb-4 h-full w-full justify-center items-start">
            <form className="flex flex-col w-50  gap-4 mt-4" onSubmit={handleSubmit(hendleSubmit)}>
                <div className="flex flex-row  gap-2">
                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor="nomeEvento">Nome do Evento</label>
                        <input type="text" id="nomeEvento" className="ka-input" {...register("nomeEvento")} />
                    </div>
                </div>
                    <div className="flex flex-col  gap-2">
                        <label htmlFor="descricaoEvento">Descrição do Evento</label>
                        <textarea id="descricaoEvento" className="ka-input" {...register("descricaoEvento")} />
                    </div>
                
                <div className="flex flex-row gap-2">
                    <div className="flex flex-col w-50 gap-2">
                        <label htmlFor="dataInicio">Data de Início</label>
                         <input type="date" id="dataInicio" className="ka-input" {...register("dataInicio")} />
                    </div>
                    <div className="flex flex-col w-50 gap-2">
                        <label htmlFor="dataFim">Data de Fim</label>
                        <input type="date" id="dataFim" className="ka-input" {...register("dataFim")} />
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
                    <Button className="btn btn-green" onClick={handleSubmit(hendleSubmit)}>Salvar</Button>
                    <Button className="btn btn-corrida-reset" onClick={() => reset()}>Limpar</Button>
                </div>
            </form>
                <div className="p-10 w-50">
                    <label className="text-xl font-bold mb-4">Baterias</label>
                    <Card className="p-10 border border-dashed border-red-600 rounded-xl bg-transparent-30">
                        <CardContent className="flex flex-col gap-2">
                            {baterias.map((bateria, index) => (
                                <div key={bateria._id} className="flex flex-row justify-between items-center text-white">
                                    {bateria._id === idBateria? (
                                        <input type="checkbox" onChange={() =>{handleLinhaSelecionada(index)}} checked={true} />)  : (
                                        <input type="checkbox" onChange={() => {handleLinhaSelecionada(index)}} checked={linhasSelecionadas.includes(index)} />
                                    )}
                                    {/*<input type="checkbox" onChange={() => setIdBateria(bateria._id)} />*/}
                                    <p>{bateria.nome}</p>
                                    <Button className="btn " onClick={() => console.log("Remover bateria", bateria.nome)}><FaWindowClose /></Button>
                                </div>                               
                            ))}
                        </CardContent>
                    </Card>
                    <div className="flex grid grid-flow-col justify-items-end gap-2 mt-4">
                        <Button className="btn btn-green mb-4 " onClick={() => handleAdicionarBateria()}>Adicionar bateria</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}