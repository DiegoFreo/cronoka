"use client"
import React,{use, useState, useEffect} from "react";
import { useForm} from "react-hook-form"; 
import { FaEdit, FaTrash } from "react-icons/fa";
import "@/componets/styles.css";
import "@/componets/stylescorrida.css";

interface Piloto {
    id_piloto: number;
    nome: string;
    numero_piloto: string;
    cpf: string;
    tag_rfid_1: string;
    tag_rfid_2?: string;
    tag_rfid_3?: string;
    tag_rfid_4?: string;
}

const CadPiloto = () => {
    const { register, handleSubmit} = useForm();
    const [piloto, setPiloto] = useState<Piloto[]>([]);
    const[nmPiloto, setNmPiloto] = useState('');
    const[numeroPilotom, setNumeroPiloto] = useState('');
    const[cpfPiloto, setCPFPiloto] = useState('');
    const[tag1Piloto, setTag1Piloto] = useState('');
    const[tag2Piloto, setTag2Piloto] = useState('');
    const[tag3Piloto, setTag3Piloto] = useState('');
    const[tag4Piloto, setTag4Piloto] = useState('');    

    useEffect(()=>{
        buscatPiloto();
    },[])

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
            const response = await fetch("http://localhost:3030/piloto");
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
            if (Piloto.id_piloto === id) {
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
        setNmPiloto("");
        setCPFPiloto("");
        setNumeroPiloto("");
        setTag1Piloto("");
        setTag2Piloto("");
        setTag3Piloto("");
        setTag4Piloto("");

    }
    async function editarPiloto(id: number) {
        // Aqui você pode fazer uma chamada à API para editar os dados do piloto    
        // Exemplo de chamada fictícia:
        // await api.put(`/pilotos/${id}`, { nome, npiloto, cpf });
        try {
            const response = await fetch(`http://localhost:3030/piloto/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: nmPiloto, numero_piloto: numeroPilotom, cpf: cpfPiloto, tag_rfid_1: tag1Piloto, tag_rfid_2: tag2Piloto, tag_rfid_3: tag3Piloto, tag_rfid_4: tag4Piloto }),
            });
            if (!response.ok) {
                throw new Error('Erro ao editar piloto');
            }
            alert("Piloto editado com sucesso!");
            buscatPiloto(); // Atualiza a lista de pilotos após a edição
            limparCanpos();
        } catch (erro: any) {
            console.error("Erro ao editar piloto:", erro);
            alert("Erro ao editar piloto: " + erro.message);
        }   
    }
    async function excluirPiloto(id: number) {
        // Aqui você pode fazer uma chamada à API para excluir o piloto
        // Exemplo de chamada fictícia: 
        // await api.delete(`/pilotos/${id}`); 
        try {
            const response = await fetch(`http://localhost:3030/piloto/${id}`, {
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
    async function  onSubmit (data: any) {

       
        const { nome, numero_piloto, cpf, tag_rfid_1 } = data;
        // Aqui você pode fazer uma chamada à API para salvar os dados do piloto
        // Exemplo de chamada fictícia: 
        // await api.post('/pilotos', { nome, npiloto, cpf });
        try{
        const response = await fetch("http://localhost:3030/piloto", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, numero_piloto, cpf, tag_rfid_1 }),
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar piloto');

            }else{
                alert("Piloto cadastrado com sucesso!");
                buscatPiloto(); // Atualiza a lista de pilotos após o cadastro
                limparCanpos();
                return response.json();
            }
        })
        } catch (erro: any) {
            console.error("Erro ao cadastrar piloto:", erro);
            alert("Erro ao cadastrar piloto: " + erro.message);
        }
       
    }
    return (
        <div className="contenter-form bg-footer">
            <h1>Cadastro de Piloto</h1>
            <div className="is-flex ">
                <div className="content-form-form  w-50">
                 <form  className="w-100" onSubmit={handleSubmit(onSubmit)} >
                    <div className="w-100 is-flex fix">
                        <div className="w-100 ">
                            <label htmlFor="nome" >Nome:</label>
                            <input {...register('nome')} className="ka-input w-100" value={nmPiloto} onChange={handleChangeNmPiloto} type="text" id="nome" placeholder="Nome" name="nome" required />
                        </div>                        
                    </div>
                    <div className="w-100 is-flex fix">
                        <div className="w-100 ">
                            <label htmlFor="numero_piloto">Número Piloto:</label>
                            <input {...register('numero_piloto')} className="ka-input w-100" value={numeroPilotom} onChange={handleChangeNumeroPiloto} type="text" id="numero_piloto" placeholder="Numero do piloto" name="numero_piloto" required />
                        </div>
                        <div className="w-100 ">
                            <label htmlFor="cpf">CPF:</label>
                            <input {...register('cpf')} className="ka-input w-100" value={cpfPiloto} onChange={handleChangeCPFPiloto} type="text" id="cpf" placeholder="CPF" name="cpf" required />
                        </div>
                    </div>
                     <div className="w-100 is-flex fix">
                        <div className="w-100 ">
                            <label htmlFor="tag_rfid_1">TAG 1:</label>
                            <input {...register('tag_rfid_1')} className="ka-input w-100" value={tag1Piloto} onChange={handleChangeTag1Piloto} type="text" id="tag_rfid_1" placeholder="tag_rfid_1" name="tag_rfid_1" required />
                        </div>
                        <div className="w-100 ">
                            <label htmlFor="tag_rfid_2">TAG 2:</label>
                            <input {...register('tag_rfid_2')} className="ka-input w-100" value={tag2Piloto} onChange={handleChangeTag2Piloto} type="text" id="tag_rfid_2" placeholder="tag_rfid_2" name="tag_rfid_2" />
                        </div>
                     </div>
                     <div className="w-100 is-flex fix">
                        <div className="w-100 ">
                            <label htmlFor="tag_rfid_3">TAG 3:</label>
                            <input {...register('tag_rfid_3')} className="ka-input w-100" value={tag3Piloto} onChange={handleChangeTag3Piloto} type="text" id="tag_rfid_3" placeholder="tag_rfid_3" name="tag_rfid_3" />
                        </div>
                        <div className="w-100 ">
                            <label htmlFor="tag_rfid_4">TAG 4:</label>
                            <input {...register('tag_rfid_4')} className="ka-input w-100" value={tag4Piloto} onChange={handleChangeTag4Piloto} type="text" id="tag_rfid_4" placeholder="tag_rfid_4" name="tag_rfid_4" />
                        </div>
                     </div>
                     <div className="text-center py-4 text-sm text-muted-foreground border-t bg-footer border-border aling-center">
                        <button className="btn-corrida bg-cronometro" type="submit" onClick={handleSubmit(onSubmit)}>Salvar</button>
                        <button className="btn-corrida bg-cronometro" type="reset" onClick={limparCanpos}>Limpar</button>
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
                                <td><button className="component-button-black" onClick={()=>carregarDadosPiloto(piloto.id_piloto)}  ><FaEdit /></button></td>
                                <td><button className="component-button-black" onClick={()=>excluirPiloto(piloto.id_piloto)} ><FaTrash /></button></td>
                            </tr>
                        ))}                     
                        </tbody>
                    </table>
                    </div>
                </div>
             </div>   
        </div>
    );
}

export default CadPiloto;