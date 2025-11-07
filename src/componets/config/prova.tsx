import React, {use, useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { Select, SelectItem } from "../ui/select";
import {Evento, Piloto, Categoria, Bateria} from '@/lib/type';
import { FaTrash } from "react-icons/fa";

interface ProvaFormData {
    nome: string;
    data: string;
    bateria: string;
    categoria: string;
    competidores: string[];
}

const Prova = ()=>{
    const { register, handleSubmit } = useForm();
    const [evento, setEvento] = useState<Evento[]>([]);
    const [eventoSelecionado, setEventoSelecionado] = useState<string>('');
    const [bateria, setBateria] = useState<Bateria[]>([]);
    const [bateriaSelecionada, setBateriaSelecionada] = useState<string>('');
    const [categoria, setCategoria] = useState<Categoria[]>([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('');
    const [pilotos, setPilotos] = useState<Piloto[]>([]);
    const [competidoresSelecionados, setCompetidoresSelecionados] = useState<Piloto[]>([]);
    const [dataProva, setDataProva] = useState<string>('');


    useEffect(()=>{
        loadDados(); 
    },[]);

    const handleDataChange = (e:any) => {
        const selectedEventoId = e.target.value;
        setEventoSelecionado(selectedEventoId);

        const selectedEvento = evento.find(evnt => evnt._id === selectedEventoId);
        if (selectedEvento) {
            const dataInicio = new Date(selectedEvento.data_inicio).toISOString().split('T')[0];
            setDataProva(dataInicio);
        }else{
            setDataProva('');
        }

   }
   const handleBateriaChange = (e:any) => {
        const selectedBateriaId = e.target.value;
        setBateriaSelecionada(selectedBateriaId);
   }
   const handleCategoriaChange = (e:any) => {
        const selectedCategoriaId = e.target.value;
        setCategoriaSelecionada(selectedCategoriaId);
   }
   const handleCompetidoresChange = (e:any) => {
    /*
        const selectedCompetidoresIds = Array.from(e.target.selectedOptions, (option:any) => option.value);
        const selecionados = pilotos.filter(piloto => selectedCompetidoresIds.includes(piloto._id));
     */
        setCompetidoresSelecionados((prevCompetidores) => {
            if(prevCompetidores.includes(e.target.value)){
                return prevCompetidores.filter(piloto => piloto._id !== e.target.value);
            }else{
                const pilotoSelecionado = pilotos.find(piloto => piloto._id === e.target.value);
                if(pilotoSelecionado){
                    if(!prevCompetidores.includes(pilotoSelecionado)){
                        return [...prevCompetidores, pilotoSelecionado];
                    }
                    
                }else{
                    return prevCompetidores;
                }
            }
            return prevCompetidores;
        });
   }

   async function loadDados(){
        try{
            //carregar eventos
            const response = await fetch('/api/evento');
            if(!response.ok){
                throw new Error('Erro ao carregar evento');
            }
            const data = await response.json();
            setEvento(data);
            //carregar baterias
            const responseBateria = await fetch('/api/bateria');
            if(!responseBateria.ok){
                throw new Error('Erro ao carregar bateria');
            }
            const bateriaData = await responseBateria.json();
            setBateria(bateriaData);
            
            //carregar categorias
            const categoriaResponse = await fetch('/api/categoria');
            if(!categoriaResponse.ok){
                throw new Error('Erro ao carregar categoria');
            }
            const categoriaData = await categoriaResponse.json();
            setCategoria(categoriaData);

            //carregar pilotos
            const pilotoResponse = await fetch('/api/piloto');
            if(!pilotoResponse.ok){
                throw new Error('Erro ao carregar piloto');
            }
            const pilotoData = await pilotoResponse.json();
            setPilotos(pilotoData);
            
            
        }catch(error){
            console.error('Erro ao carregar evento:', error);

        }
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
                            <Select {...register('nome')} className="ka-input w-100" id="nome" value={eventoSelecionado} onChange={handleDataChange} name="nome" required >
                                <SelectItem value="">Selecione a Prova</SelectItem>
                                {evento.map((evnt, key)=>(
                                    <SelectItem key={key} value={evnt._id}>{evnt.nome_evento} - {FormatData(evnt.data_inicio)}</SelectItem>                            
                                ))}
                            </Select>
                        </div>
                        <div className="w-100 mt-4">
                            <label htmlFor="data">Data da Prova:</label>
                            <input {...register('data')} type="date" className="ka-input w-100" value={dataProva} id="data" onChange={(e)=>setDataProva(e.target.value)} name="data" required readOnly />  
                        </div>
                    </div>
                    <div className="content-form-form  w-50 p-10">
                        <div className="w-100">
                            <label htmlFor="bateria">Selecione a Bateria:</label>
                            <Select {...register('bateria')} className="ka-input w-100" id="bateria" value={bateriaSelecionada} onChange={handleBateriaChange} name="bateria" required >
                                <SelectItem value="">Selecione a Prova</SelectItem>
                                {bateria.map((bat, key)=>(
                                    <SelectItem key={key} value={bat._id}>{bat.nome}</SelectItem>                            
                                ))}
                            </Select>
                        </div>
                        <div className="w-100">
                            <label htmlFor="categoria">Selecione a Categoria</label>
                            <Select {...register('categoria')} className="ka-input w-100" id="categoria" value={categoriaSelecionada} onChange={handleCategoriaChange} name="categoria" required >
                                <SelectItem value="">Selecione a Prova</SelectItem>
                                {categoria.map((cat, key)=>(
                                    <SelectItem key={key} value={cat._id}>{cat.nome}</SelectItem>                            
                                ))}
                            </Select>
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
                                {competidoresSelecionados.filter(piloto => categoriaSelecionada === '' || piloto.status === categoriaSelecionada).map((piloto, key)=>(
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
                <div className="is-flex justify-end p-10">
                    <button type="submit" className="btn btn-corrida">Salvar Configuração</button>
                </div>
            </form>
        </div>    
    )
}

export default Prova;