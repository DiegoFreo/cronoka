'use client';
import React, { useEffect, useState } from "react";
import Button from "../ui/Buttom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";


interface Piloto {
    _id: number;
    nome: string;
    numero_piloto: string;
    cpf: string;
    tag_rfid_1: string;
    tag_rfid_2?: string;
    tag_rfid_3?: string;
    tag_rfid_4?: string;
}

const Piloto = () => {
    const { register, handleSubmit, reset} = useForm();
    const [piloto, setPiloto] = useState<Piloto[]>([]);
    const [idPiloto, setIdPiloto] = useState<number | null>(null);
    const [nmPiloto, setNmPiloto] = useState('');
    const [numeroPiloto, setNumeroPiloto] = useState('');
    const [CPFPiloto, setCPFPiloto] = useState('');
    const [tag1Piloto, setTag1Piloto] = useState('');
    const [tag2Piloto, setTag2Piloto] = useState('');
    const [tag3Piloto, setTag3Piloto] = useState('');
    const [tag4Piloto, setTag4Piloto] = useState('');

    useEffect(() => {
        buscatPiloto();
    }, []);

    const handleChangeNmPiloto = (e:any)=>{
            setNmPiloto(e.target.value);
    }
    const handleChangeNumeroPiloto = (e:any)=>{
            setNumeroPiloto(e.target.value);
    }
    const handleChangeCPFPiloto = (e:any)=>{
            setCPFPiloto(e.target.value);
    }
    const handleChangeTag1Piloto = (e:any)=>{
            setTag1Piloto(e.target.value);
    }
    const handleChangeTag2Piloto = (e:any)=>{
            setTag2Piloto(e.target.value);
    }
    const handleChangeTag3Piloto = (e:any)=>{
            setTag3Piloto(e.target.value);
    }
    const handleChangeTag4Piloto= (e:any)=>{
            setTag4Piloto(e.target.value);
    }

    async function buscatPiloto() {
        // Aqui você pode fazer uma chamada à API para buscar os dados do piloto
        // Exemplo de chamada fictícia: 
        // const response = await api.get('/pilotos');
        try {
            const response = await fetch("/api/piloto");
            if (!response.ok) {
                throw new Error('Erro ao buscar pilotos');
            }
            const data = await response.json();
            setPiloto(data);
           
        } catch (erro: any) {
            console.error("Erro ao buscar pilotos:", erro);
            alert("Erro ao buscar pilotos: " + erro.message);
        }
    }
    function carregarDadosPiloto(id: number) {
        piloto.forEach((Piloto) => {
            if (Piloto._id === id) {
                setIdPiloto(Piloto._id);
                setNmPiloto(Piloto.nome);
                setNumeroPiloto(Piloto.numero_piloto);
                setCPFPiloto(Piloto.cpf);
                setTag1Piloto(Piloto.tag_rfid_1);
                setTag2Piloto(Piloto.tag_rfid_2 || '');
                setTag3Piloto(Piloto.tag_rfid_3 || '');
                setTag4Piloto(Piloto.tag_rfid_4 || '');
            }
        });
    }
    function limparCanpos(){
        
        setIdPiloto(null);
        setNmPiloto('');    
        setNumeroPiloto('');
        setCPFPiloto('');
        setTag1Piloto('');
        setTag2Piloto('');
        setTag3Piloto('');
        setTag4Piloto('');
    }
    async function excluirPiloto(id: number) {
        // Aqui você pode fazer uma chamada à API para excluir o piloto
        // Exemplo de chamada fictícia: 
        // await api.delete(`/pilotos/${id}`); 
        try {
            const response = await fetch(`/api/piloto/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir piloto');
            }
            alert("Piloto excluído com sucesso!");
            buscatPiloto(); // Atualiza a lista de pilotos após a exclusão
        } catch (erro: any) {
            console.error("Erro ao excluir piloto:", erro);
            alert("Erro ao excluir piloto: " + erro.message);
        }
    }


    async function handleFormSubmit(data: any) {
       
        // Aqui você pode fazer uma chamada à API para salvar os dados do piloto
        // Exemplo de chamada fictícia: 
        // await api.post('/pilotos', { nome, npiloto, cpf });
                
        try{
            
        if(piloto.map(p=> p._id === idPiloto).includes(true)){
            const nome = nmPiloto;
            const numero_piloto = numeroPiloto;
            const cpf = CPFPiloto;
            const tag_rfid_1 = tag1Piloto;
            const tag_rfid_2 = tag2Piloto || null;
            const tag_rfid_3 = tag3Piloto || null;
            const tag_rfid_4 = tag4Piloto || null;
           
        const response = await fetch(`/api/piloto/${idPiloto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, numero_piloto, cpf, tag_rfid_1, tag_rfid_2, tag_rfid_3, tag_rfid_4 }),
        });

        if (!response.ok) {
                throw new Error('Erro ao cadastrar piloto');

            }else{
                alert("Piloto cadastrado com sucesso!");
                buscatPiloto(); // Atualiza a lista de pilotos após o cadastro
                limparCanpos(); // Limpa os campos do formulário após o cadastro
                return response.json();
            }
    } else{
            const response = await fetch('/api/piloto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            if (!response.ok) {
                throw new Error('Erro ao cadastrar piloto');
            }else{
                alert("Piloto cadastrado com sucesso!");
                buscatPiloto();
                limparCanpos();
                return response.json();
            }        
    } 
        } catch (erro: any) {
            console.error("Erro ao cadastrar piloto:", erro);
            alert("Erro ao cadastrar piloto: " + erro.message);
        }
    }
    
    return (
        <div className="is-flex">
        <div className="content-form-form  w-50">
            <form  className="w-100" onSubmit={handleSubmit(handleFormSubmit)} >
                    <div className="w-100 is-flex fix">
                        <div className="w-100 ">
                            <label htmlFor="nome" >Nome:</label>
                            <input {...register('nome')} className="ka-input w-100" value={nmPiloto ?? ''} onChange={handleChangeNmPiloto}  type="text" id="nome" placeholder="Nome" name="nome" required />
                        </div>                        
                    </div>
                    <div className="w-100 is-flex fix">
                        <div className="w-100 ">
                            <label htmlFor="numero_piloto">Número Piloto:</label>
                            <input {...register('numero_piloto')} className="ka-input w-100" value={numeroPiloto ?? ''} onChange={handleChangeNumeroPiloto} type="text" id="numero_piloto" placeholder="Numero do piloto" name="numero_piloto" required />
                        </div>
                        <div className="w-100 ">
                            <label htmlFor="cpf">CPF:</label>
                            <input {...register('cpf')} className="ka-input w-100"  type="text" value={CPFPiloto ?? ''} onChange={handleChangeCPFPiloto} id="cpf" placeholder="CPF" name="cpf" required />
                        </div>
                    </div>
                     <div className="w-100 is-flex fix">
                        <div className="w-100 ">
                            <label htmlFor="tag_rfid_1">TAG 1:</label>
                            <input {...register('tag_rfid_1')} className="ka-input w-100"  type="text" value={tag1Piloto ?? ''} onChange={handleChangeTag1Piloto} id="tag_rfid_1" placeholder="tag_rfid_1" name="tag_rfid_1" required />
                        </div>
                        <div className="w-100 ">
                            <label htmlFor="tag_rfid_2">TAG 2:</label>
                            <input {...register('tag_rfid_2')} className="ka-input w-100"  type="text" value={tag2Piloto ?? ''} onChange={handleChangeTag2Piloto} id="tag_rfid_2" placeholder="tag_rfid_2" name="tag_rfid_2" />
                        </div>
                     </div>
                     <div className="w-100 is-flex fix">
                        <div className="w-100 ">
                            <label htmlFor="tag_rfid_3">TAG 3:</label>
                            <input {...register('tag_rfid_3')} className="ka-input w-100"  type="text"value={tag3Piloto ?? ''} onChange={handleChangeTag3Piloto} id="tag_rfid_3" placeholder="tag_rfid_3" name="tag_rfid_3" />
                        </div>
                        <div className="w-100 ">
                            <label htmlFor="tag_rfid_4">TAG 4:</label>
                            <input {...register('tag_rfid_4')} className="ka-input w-100"  type="text" value={tag4Piloto ?? ''} onChange={handleChangeTag4Piloto} id="tag_rfid_4" placeholder="tag_rfid_4" name="tag_rfid_4" />
                        </div>
                     </div>
                <div className=" ka-modal-footer">
                    <Button className="btn btn-green" onClick={handleSubmit(handleFormSubmit)}>Salvar</Button>
                    <Button className="btn btn-corrida-reset"  onClick={()=>limparCanpos()}>Cancelar</Button>                       
                 
                </div>
            </form>           
        </div>
            <div className="p-10 w-50">   
                <div className="scrollbar">                
                    <table border={1} className="ka-table">
                        <thead>
                            <tr><th colSpan={4} className="ka-table-title" >Tabela Piloto</th></tr>
                                <tr>
                                    <th>Nome</th>
                                    <th>Número Piloto</th>
                                    <th colSpan={2}>Editar/Excluir</th>
                                </tr>
                        </thead>
                        <tbody>
                            {piloto.map((piloto, index) => (
                                <tr key={index}>    
                                <td>{piloto.nome}</td>
                                <td>{piloto.numero_piloto}</td>
                                <td><button className="component-button-black" onClick={()=>carregarDadosPiloto(piloto._id)}  ><FaEdit /></button></td>
                                <td><button className="component-button-black" onClick={()=>excluirPiloto(piloto._id)} ><FaTrash /></button></td>
                                </tr>
                            ))}        
                            
                        </tbody>    
                    </table>
                </div>
            </div>
        </div>
    );
}
export default Piloto;