'use client';
import React, { useEffect, useState } from "react";
import Button from "../ui/Buttom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Select, SelectItem } from "../ui/select";
import SelectSearchable from "../ui/SelectSearchable";
import { set } from "mongoose";

interface Piloto {
    _id: string;
    nome: string;
    numero_piloto: string;
    cpf: string;
    nome_equipe: string;
    filiacao:  string;
    patrocinador:  string;   
    dataNascimento: Date;
    telefone: string;
    responsavel:  string; 
    tipoSanguineo:  string;
    //categoriaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' },
    tag: string[];   
}
interface Categoria {
    _id: string;
    nome: string;
}

interface TagsPiloto {
    _id: string;
    tag: string;  
    num: number; 
}
interface PilotoProps {
    _id?: string;
}

const Piloto = ({ _id }: PilotoProps) => {
    const { register, handleSubmit, reset} = useForm();
    const [piloto, setPiloto] = useState<Piloto[]>([]);
    const [idPiloto, setIdPiloto] = useState<string | null>(null);
    const [nmPiloto, setNmPiloto] = useState<string>('');
    const [numeroPiloto, setNumeroPiloto] = useState<string>('');
    const [CPFPiloto, setCPFPiloto] = useState<string>('');
    const [nomeEquipe, setNomeEquipe] = useState<string>('');
    const [filiacao, setFiliacao] = useState('');
    const [patrocinadores, setPatrocinadores] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [dtNascimento, setdtNascimento] = useState<Date>(new Date());
    const [responsavelPiloto, setResponsavelPiloto] = useState<string>('');
    const [tpSanguineo, settpSanguineo] = useState<string>('');
    const [tags, setTags] = useState<TagsPiloto[]>([]);
    const [tagSelecionada, setTagSelecionada] = useState<string>('');
    const [linhasSelecionadas, setLinhasSelecionada] = useState<number[]>([]);
    const [categoria, setCategoria] = useState<Categoria[]>([]);

    useEffect(() => {
        buscatPiloto();
        buscaTags();
        buscatCategoria(); 
    }, []);

     const handleCheckboxChange = (index: number) => {
        if (linhasSelecionadas.includes(index)) {
            // Se já estava selecionado, remove da lista
            setLinhasSelecionada(linhasSelecionadas.filter((i) => i !== index));
        } else {
            // Se não estava, adiciona na lista
            setLinhasSelecionada([...linhasSelecionadas, index]);
        }
    };

    const handleChangeNmPiloto = (e:any)=>{
            setNmPiloto(e.target.value);
    }
    const handleChangeNumeroPiloto = (e:any)=>{
            setNumeroPiloto(e.target.value);
    }
    const handleChangeCPFPiloto = (e:any)=>{
            setCPFPiloto(e.target.value);
    }
    const handleChangeNomeEquipe = (e:any)=>{
            setNomeEquipe(e.target.value);
    }
    const handleChangeFiliacao = (e:any)=>{
            setFiliacao(e.target.value);
    }
    const handleChangePatrocinador = (e:any)=>{
            setPatrocinadores(e.target.value);
    }
    const handleChangeTelefone = (e:any)=>{
            setTelefone(e.target.value);
    }
    const handleChangeDataNascimento = (e:any)=>{
            setdtNascimento(e.target.value);
    }
    const handleChangeResponsavel = (e:any)=>{
            setResponsavelPiloto(e.target.value);
    }
    const handleChangeTipoSanguineo = (e:any)=>{
            settpSanguineo(e.target.value);
    }
    const handleChangeTags = (e:any)=>{
            setTagSelecionada(e.target.value);
    }
    
    async function buscatCategoria() {
        // Aqui você pode fazer uma chamada à API para buscar os dados do piloto
        // Exemplo de chamada fictícia: 
        // const response = await api.get('/pilotos');
        try {
            const response = await fetch("/api/categoria");
            if (!response.ok) {
                throw new Error('Erro ao buscar categorias');
            }
            const data = await response.json();
            setCategoria(data);
           
        } catch (erro: any) {
            console.error("Erro ao buscar categorias:", erro);
            alert("Erro ao buscar categorias: " + erro.message);
        }
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
            pilotoSelecionado(data as Piloto[]);
        } catch (erro: any) {
            console.error("Erro ao buscar pilotos:", erro);
            alert("Erro ao buscar pilotos: " + erro.message);
        }
    }
    async function buscaTags() {
        try {
            const response = await fetch("/api/tag");
            if (!response.ok) {
                throw new Error('Erro ao buscar tags');
            }
            const data = await response.json();
            setTags(data);
           
        } catch (erro: any) {
            console.error("Erro ao buscar tags:", erro);
            alert("Erro ao buscar tags: " + erro.message);
        }
        
    }
    function pilotoSelecionado(p: Piloto[]) {
        p.forEach((Piloto) => {            
            if (Piloto._id === _id) {
                setIdPiloto(Piloto._id);
                setNmPiloto(Piloto.nome);
                setNumeroPiloto(Piloto.numero_piloto);
                setCPFPiloto(Piloto.cpf);
                setTelefone(Piloto.telefone);
                setNomeEquipe(Piloto.nome_equipe);
                setFiliacao(Piloto.filiacao);
                setPatrocinadores(Piloto.patrocinador );
                setdtNascimento(Piloto.dataNascimento);
                setResponsavelPiloto(Piloto.responsavel);
                settpSanguineo(Piloto.tipoSanguineo);
            }
        })
       
    }
    async function carregarDadosPiloto(id: string) {    
        piloto.forEach((Piloto) => {
            if (Piloto._id === id) {
                setIdPiloto(Piloto._id);
                setNmPiloto(Piloto.nome);
                setNumeroPiloto(Piloto.numero_piloto);
                setCPFPiloto(Piloto.cpf);
                setTelefone(Piloto.telefone);
                setNomeEquipe(Piloto.nome_equipe);
                setFiliacao(Piloto.filiacao as string);
                setPatrocinadores(Piloto.patrocinador as string);
                setdtNascimento(Piloto.dataNascimento as unknown as Date);
                setResponsavelPiloto(Piloto.responsavel as string);
                settpSanguineo(Piloto.tipoSanguineo as string);
                
            }
            
        });
       
    }
    function limparCanpos(){
        setIdPiloto(null);
        setNmPiloto('');    
        setNumeroPiloto('');
        setCPFPiloto('');
    }
    async function excluirPiloto(id: string) {
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
            const fone = telefone;
            const nome_equipe = nomeEquipe;
            const fil = filiacao;
            const dataNascimento = dtNascimento;
            const patrocinador = patrocinadores;
            const responsavel = responsavelPiloto;
            const tipoSanguineo = tpSanguineo;
            const tag = tagSelecionada;
            
           
        const response = await fetch(`/api/piloto/${idPiloto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, numero_piloto, cpf, fone, nome_equipe, fil, dataNascimento, patrocinador, responsavel, tipoSanguineo, tag }),
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
                    <div className="w-100 is-flex fix gap20">
                        <div className="w-100 ">
                            <label htmlFor="nome" >Nome:</label>
                            <input {...register('nome')} className="ka-input w-100" value={nmPiloto ?? ''} onChange={handleChangeNmPiloto}  type="text" id="nome" placeholder="Nome" name="nome" required />
                        </div> 
                        <div className="w-100">
                            <label htmlFor="tag">Tag:</label>
                            <SelectSearchable
                                value={tagSelecionada}
                                placeholder="Selecione uma Tag"
                                options={tags.map((tag) => ({
                                    value: tag.num,
                                    label: tag.num > 9 ? '00' + tag.num : '000' + tag.num,
                                }))}
                                onSelect={setTagSelecionada}
                            />

                            {/*
                            <Select className="ka-seclect w-100" id="tag" value={tagSelecionada} onChange={handleChangeTags} >
                                <option value="">Selecione uma Tag</option>
                                {tags.map((tag) => (
                                    <SelectItem key={tag._id} value={tag.tag}>
                                        {tag.tag}
                                    </SelectItem>
                                ))}
                            </Select>*/
                            }
                        </div>                      
                    </div>
                    <div className="w-100 is-flex fix gap20">
                        <div className="w-100 ">
                            <label htmlFor="numero_piloto">Número Piloto:</label>
                            <input {...register('numero_piloto')} className="ka-input w-100" value={numeroPiloto ?? ''} onChange={handleChangeNumeroPiloto} type="text" id="numero_piloto" placeholder="Numero do piloto" name="numero_piloto" required />
                        </div>
                        <div className="w-100 ">
                            <label htmlFor="cpf">CPF:</label>
                            <input {...register('cpf')} className="ka-input w-100"  type="text" value={CPFPiloto ?? ''} onChange={handleChangeCPFPiloto} id="cpf" placeholder="CPF" name="cpf" required />
                        </div>
                        <div className="w-100 ">
                            <label htmlFor="telefone">Telefone:</label>
                            <input {...register('telefone')} className="ka-input w-100"  type="text" value={telefone ?? ''} onChange={handleChangeTelefone} id="telefone" placeholder="Telefone" name="telefone" required />
                        </div>
                    </div>
                     <div className="w-100 is-flex fix gap20">
                         <div className="w-100 ">
                            <label htmlFor="nome_equipe">Nome da Equipe:</label>
                            <input {...register('nome_equipe')} className="ka-input w-100"  type="text" value={nomeEquipe ?? ''} onChange={handleChangeNomeEquipe} id="nome_equipe" placeholder="Nome da Equipe" name="nome_equipe" required />
                        </div>
                        <div className="w-100 ">
                            <label htmlFor="filiacao">Filiação:</label>
                            <input {...register('filiacao')} className="ka-input w-100"  type="text" value={filiacao ?? ''} onChange={handleChangeFiliacao} id="filiacao" placeholder="Filiação" name="filiacao" required />
                        </div>
                         <div className="w-100 ">
                            <label htmlFor="patrocinador">Patrocinador:</label>
                            <input {...register('patrocinador')} className="ka-input w-100"  type="text" value={patrocinadores ?? ''} onChange={handleChangePatrocinador} id="patrocinador" placeholder="Patrocinador" name="patrocinador" required />
                        </div>
                        
                     </div>
                     <div className="w-100 is-flex fix gap20">
                         <div className="w-100 ">
                            <label htmlFor="datanascimento">Data de Nascimento:</label>
                            <input {...register('datanascimento')} className="ka-input w-100"  type="date" value={dtNascimento?.toISOString().split('T')[0] ?? ''} onChange={handleChangeDataNascimento} id="datanascimento" placeholder="Data de Nascimento" name="datanascimento" required />
                        </div>
                        <div className="w-100 ">
                            <label htmlFor="responsavel">Responsavel:</label>
                            <input {...register('responsavel')} className="ka-input w-100"  type="text" value={responsavelPiloto ?? ''} onChange={handleChangeResponsavel} id="responsavel" placeholder="Responsavel" name="responsavel" required />
                        </div>
                         <div className="w-100 ">
                            <label htmlFor="tiposanguineo">Tipo Sanguíneo:</label>
                            <input {...register('tiposanguineo')} className="ka-input w-100"  type="text" value={tpSanguineo ?? ''} onChange={handleChangeTipoSanguineo} id="tiposanguineo" placeholder="Tipo Sanguíneo" name="tiposanguineo" required />
                        </div>
                        
                     </div>
                <div className=" ka-modal-footer gap20">
                    <Button className="btn btn-green" onClick={handleSubmit(handleFormSubmit)}>Salvar</Button>
                    <Button className="btn btn-corrida-reset"  onClick={()=>limparCanpos()}>Cancelar</Button>                       
                 
                </div>
            </form>           
        </div>
            <div className="p-10 w-50">   
                <div className="scrollbar">                
                    <table border={1} className="ka-table">
                        <thead>
                            <tr><th colSpan={4} className="ka-table-title" >Tabela Competidores</th></tr>
                                <tr>
                                    <th>Flag</th>
                                    <th>Nome</th>
                                </tr>
                        </thead>
                        <tbody>
                            {categoria.map((cat, index) => (
                                <tr key={index}>  
                                <td><input type="checkbox" onChange={() => handleCheckboxChange(index)} checked={linhasSelecionadas.includes(index)} /></td>  
                                <td>{cat.nome}</td>
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