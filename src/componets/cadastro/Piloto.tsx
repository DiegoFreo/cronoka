'use client';
import React, { useEffect, useState } from "react";
import Button from "../ui/Buttom";
import { useForm } from "react-hook-form";
import SelectSearchable from "../ui/SelectSearchable";
//import Categoria from "./categoria";
import { Pi } from "lucide-react";
import { Categoria } from "@/lib/type";
import { set } from "mongoose";

interface Piloto {
    _id: string;
    nome: string;
    numero_piloto: string;
    cpf: string;
    nome_equipe: string;
    filiacao:  string;
    patrocinador:  string;   
    dataNascimento: string;
    telefone: string;
    responsavel:  string; 
    tipoSanguineo:  string;
    categoria: Categorias[];
    tag: string[];   
}
interface Categorias {
    _id: string;
    nome: string;
    pilotos?: Piloto[];
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
    const [pilotosSelecionado, setPilotosSelecionado] = useState([]);
    const [categoriasPiloto, setCategoriasPiloto] = useState<Categorias[]>([]);
    const [idPiloto, setIdPiloto] = useState<string>('');
    const [nmPiloto, setNmPiloto] = useState<string>('');
    const [numeroPiloto, setNumeroPiloto] = useState<string>('');
    const [CPFPiloto, setCPFPiloto] = useState<string>('');
    const [nomeEquipe, setNomeEquipe] = useState<string>('');
    const [filiacaod, setFiliacao] = useState('');
    const [patrocinadores, setPatrocinadores] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [dtNascimento, setdtNascimento] = useState<string>('');
    const [responsavelPiloto, setResponsavelPiloto] = useState<string>('');
    const [tpSanguineo, settpSanguineo] = useState<string>('');
    const [tags, setTags] = useState<TagsPiloto[]>([]);
    const [tagSelecionada, setTagSelecionada] = useState<string>('');
    const [linhasSelecionadas, setLinhasSelecionada] = useState<number[]>([]);
    const [categoriasSelecionadas, setCategoriasSelecionad] = useState<string[]>([]);
    const [categoria, setCategoria] = useState<Categorias[]>([]);

    useEffect(() => {
        buscatCategoria(); 
        buscarCategoriaPiloto()
        buscatPiloto();
        buscaTags();
    }, []);

     const handleCheckboxChange = (index: number) => {
        if (linhasSelecionadas.includes(index)) {
            // Se já estava selecionado, remove da lista
            setLinhasSelecionada(linhasSelecionadas.filter((i) => i !== index));
            alert("Categorias Removida: " + categoria[index].nome);
            setCategoriasSelecionad(categoriasSelecionadas.filter((catId) => catId !== categoria[index]._id));

        } else {
            // Se não estava, adiciona na lista
            setLinhasSelecionada([...linhasSelecionadas, index]);
            categoria.map((cat, i)=>{
                if(i === index){
                    //setCategoriasPiloto([...categoriasPiloto, cat])
                    setCategoriasSelecionad([...categoriasSelecionadas, cat._id])
                    
                }                
            })
            
            
           //console.log(categoriasSelecionadas);
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
    async function buscarCategoriaPiloto() {
        try {
            const response = await fetch(`/api/piloto/${_id}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar categorias do piloto');
            }
            const data = await response.json();
            setCategoriasPiloto(data.data.categorias);        
        } catch (erro: any) {
            console.error("Erro ao buscar categorias do piloto:", erro);
            alert("Erro ao buscar categorias do piloto: " + erro.message);
        } 
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
   useEffect(() => {
        if (categoria.length > 0 || categoriasPiloto.length === 0) {
            handleCategoriaPiloto();
            categoriasPiloto.forEach((catPiloto) => {
                categoria.forEach((cat, index) => {
                    if (catPiloto._id === cat._id) {
                        if (!linhasSelecionadas.includes(index)) {
                            setLinhasSelecionada((prevSelected) => [...prevSelected, index]);
                            setCategoriasSelecionad((prevSelected) => [...prevSelected, cat._id]);
                        }
                        //setCategoriasSelecionad((prevSelected) => [...prevSelected, cat._id]);
                        console.log("Categorias do Piloto no useEffect: " + cat.nome);
                    }
                });
            });
           
        }
   }, [categoria, categoriasPiloto]);

    async function handleCategoriaPiloto() {
        try {
            categoria.filter((cat) => {
                categoriasPiloto.forEach((catPiloto) => {
                    if (cat._id === catPiloto._id) {
                        setLinhasSelecionada((prevSelected) => [...prevSelected, categoria.indexOf(cat)]);
                        //setCategoriasSelecionad((prevSelected) => [...prevSelected, cat._id]);
                        console.log("Categorias do Piloto: " + cat.nome);
                    }
                });
            });
           
        } catch (erro: any) {
            console.error("Erro ao associar categoria ao piloto:", erro);
            alert("Erro ao associar categoria ao piloto: " + erro.message);
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
                const datfimFormatada = new Date(Piloto.dataNascimento);
                setdtNascimento(datfimFormatada.toISOString().split('T')[0]);
                setResponsavelPiloto(Piloto.responsavel);
                settpSanguineo(Piloto.tipoSanguineo);
                setCategoriasPiloto(Piloto.categoria || []);
            }
        })
       
    }    
    function limparCanpos(){
        setIdPiloto('');
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
            const nome_equipe = nomeEquipe;
            const filiacao = filiacaod;
            const dataNascimento = dtNascimento;
            const patrocinador = patrocinadores;
            const responsavel = responsavelPiloto;
            const tipoSanguineo = tpSanguineo;
            const categorias = categoriasSelecionadas;
            const tag = tagSelecionada;

        
        alert("Categorias Selecionadas: " + linhasSelecionadas);
           
        const response = await fetch(`/api/piloto/${idPiloto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({ nome, numero_piloto, cpf, telefone, nome_equipe, filiacao, dataNascimento, patrocinador, responsavel, tipoSanguineo, categorias,  tag }),
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
                            <input {...register('filiacao')} className="ka-input w-100"  type="text" value={filiacaod ?? ''} onChange={handleChangeFiliacao} id="filiacao" placeholder="Filiação" name="filiacao" required />
                        </div>
                         <div className="w-100 ">
                            <label htmlFor="patrocinador">Patrocinador:</label>
                            <input {...register('patrocinador')} className="ka-input w-100"  type="text" value={patrocinadores ?? ''} onChange={handleChangePatrocinador} id="patrocinador" placeholder="Patrocinador" name="patrocinador" required />
                        </div>
                        
                     </div>
                     <div className="w-100 is-flex fix gap20">
                         <div className="w-100 ">
                            <label htmlFor="datanascimento">Data de Nascimento:</label>
                            <input {...register('datanascimento')} className="ka-input w-100"  type="date" value={dtNascimento ?? ''} onChange={handleChangeDataNascimento} id="datanascimento" placeholder="Data de Nascimento" name="datanascimento" required />
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
                            <tr><th colSpan={4} className="ka-table-title" >Tabela Categoria</th></tr>
                                <tr>
                                    <th>Flag</th>
                                    <th>Nome</th>
                                </tr>
                        </thead>
                        <tbody>
                            {categoria.map((cat, index) => (
                                <tr key={cat._id}>  
                                
                                <td>
                                {cat._id === _id ? (
                                    <input type="checkbox" onChange={() => handleCheckboxChange(index)} checked={true} />)  : (
                                    <input type="checkbox" onChange={() => handleCheckboxChange(index)} checked={linhasSelecionadas.includes(index) } />
                                        
                                    )}
                                
                                </td>
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