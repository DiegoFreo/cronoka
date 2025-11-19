import React, {use, useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { Select, SelectItem } from "../ui/select";
import {Evento, Piloto, Categoria, Bateria} from '@/lib/type';
import { FaTrash } from "react-icons/fa";
import { Motherboard } from "react-bootstrap-icons";
import { Bayon } from "next/font/google";
import { error } from "console";

interface ProvaFormData {
    eventoid: string;
    bateria: string[];
    categoria: string[];
    competidores: string[];
}

const Prova = ()=>{
    const { register, handleSubmit } = useForm();
    const [baterias, setBaterias] = useState<Bateria[]>([]);
    const [bateriaSelecionada, setBateriaSelecionada] = useState<string>("");
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [eventoSelecionado, setEventoSelecionado] = useState<string>("");
    const [pilotos, setPilotos] = useState<Piloto[]>([]);
    const [competidoresSelecionados, setCompetidoresSelecionados] = useState<Piloto[]>([]);
    const [horaEvento, setHoraEvento] = useState<string>("");

    useEffect(()=>{
        loadDados(); 
    },[]);

    async function loadDados(){
        //buscar os Eventos cadastrados
        const responseEventos = await fetch("/api/evento");
        if(!responseEventos.ok){
            throw new Error("Erro ao buscar os eventos");
        }
        const dataEventos = await responseEventos.json();
        setEventos(dataEventos);

        //busca as Baterias cadastradas.
        const responseBateria = await fetch("/api/bateria");
        if(!responseBateria.ok){
            throw new Error("Erro ao buscar as Baterias!");
        }
        const dataBaterias = await responseBateria.json();
        setBaterias(dataBaterias);

        //busca as categorias.
        const responseCategoria = await fetch("/api/categoria");
        if(!responseCategoria.ok){
            throw new Error("Erro ao buscar as Categorias");
        }
        const dataCategorias = await responseCategoria.json();
        setCategorias(dataCategorias);

        //Buscar pilotos cadastrados
        const responsePilotos = await fetch("/api/piloto");
        if(!responsePilotos.ok){
            throw new Error("Erro ao buscar os Competidores");
        }
        const dataPilotos = await responsePilotos.json();
        setPilotos(dataPilotos);
    }

    const handleChangeHoraEvento = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHoraEvento(event.target.value);
      }

    function handleCategoriaChange(e:any){
        setCategoriaSelecionada(e.target.value);
    }

    function handleEvento(e:any){
        const id = e.target.value;
         setEventoSelecionado(id);
    }

    function handleBateriaChange(e:any){
        setBateriaSelecionada(e.target.value)
    }
    function handleCompetidoresChange(e:any){
        const id = e.target.value;
      
        const piloto = pilotos.filter((item)=>
            item._id ==id
        );
        setCompetidoresSelecionados(prev => {
            const novos = piloto.filter(p=> !prev.some(sel => sel._id == p._id));
            return [...prev, ...novos];
        });
    }


   function FormatData(data:string){
        const date = new Date(data);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
   }


  
   const onSubmit = async (data: any) => {
        // Lógica para lidar com os dados do formulário   
        return<></>;
    }

    return(
        <div>
            <form className="form-dashboard" onSubmit={handleSubmit(onSubmit)}>
                <div className="is-flex">
                    <div className="content-form-form w-50 p-10">
                        <div className="w-100">
                            <label htmlFor="nome">Selecione a Prova:</label>
                            <Select {...register('nome')} className="ka-input w-100" id="nome" value={eventoSelecionado} onChange={handleEvento} name="nome" required >
                                <SelectItem value="">Selecione a Prova</SelectItem>
                                {eventos.map((evnt, key)=>(
                                    <SelectItem key={key} value={evnt._id}>{evnt.nome_evento} - {FormatData(evnt.data_inicio)}</SelectItem>                            
                                ))}
                            </Select>
                        </div>
                        <div className="w-100 mt-4">
                            <label htmlFor="bateria">Selecione a Bateria:</label>
                            <Select {...register('bateria')} className="ka-input w-100" id="bateria" value={bateriaSelecionada} onChange={handleBateriaChange} name="bateria" required >
                                <SelectItem value="">Selecione a Bateria</SelectItem>
                                {baterias.map((bat, key)=>(
                                    <SelectItem key={key} value={bat._id}>{bat.nome}</SelectItem>                            
                                ))}
                            </Select>
                            
                        </div>
                    </div>
                    <div className="content-form-form  w-50 p-10">
                        <div className="w-100">
                            <label htmlFor="categoria">Selecione a Categoria</label>
                            <Select {...register('categoria')} className="ka-input w-100" id="categoria" value={categoriaSelecionada} onChange={handleCategoriaChange} name="categoria" required >
                                <SelectItem value="">Selecione a Categoria</SelectItem>
                                {categorias.map((cat, key)=>(
                                    <SelectItem key={key} value={cat._id}>{cat.nome}</SelectItem>                            
                                ))}
                            </Select>
                        </div>
                        <div className="w-100">
                             <label htmlFor="data">Data da Prova:</label>
                            <input {...register("hora_bateria")} type="time" className="ka-input w-100 center" value={horaEvento} onChange={handleChangeHoraEvento} id="time"  name="time" required /> 
                        </div>
                        
                    </div>  
                </div>
                <div className="is-flex">
                    <div className="content-form-form w-100 p-10">
                            <label htmlFor="observacao">Selecione os competidores</label>
                            <Select multiple {...register('competidores')} className="ka-input w-100 h-40" onChange={handleCompetidoresChange} id="competidores" name="competidores" required >
                                {pilotos.map((piloto, key)=>(
                                    <SelectItem key={key} value={piloto._id}>{piloto.numero_piloto} - {piloto.nome}</SelectItem>                            
                                ))}
                            </Select>                     
                    </div>
                    <div className="content-form-form w-100 p-10">
                        <div className="scrollba-evento">   
                        <table className="ka-table">
                            <thead>
                                <tr>
                                    <th >Número</th>
                                    <th >Nome</th>
                                    <th >Mover</th>
                                </tr>
                            </thead>
                            <tbody>
                                {competidoresSelecionados.map((piloto, key)=>(
                                    <tr key={key}>
                                        <td >{piloto.numero_piloto}</td>
                                        <td >{piloto.nome}</td>
                                        <td ><FaTrash className="center" /></td>
                                    </tr>                           
                                ))}
                            </tbody>
                        </table>
                        </div>
                    </div>

                </div>
                
            </form>
            <div className="is-flex justify-end p-10">
                    <button type="submit" className="btn btn-corrida" onClick={()=>{}}>Salvar Configuração</button>
            </div>
        </div>    
    )
}

export default Prova;