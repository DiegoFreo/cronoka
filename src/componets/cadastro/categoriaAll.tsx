import React, { useEffect } from "react";
import { Card, CardContent } from "@/componets/ui/card";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import SelectSearchable from "@/componets/ui/SelectSearchable";
import Button from "@/componets/ui/Buttom";
import '@/componets/stylescorrida.css';
import '@/componets/dashboard.css';
import '@/componets/styles.css';
import Modal from "../Modal";
import Categoria from "./categoria";

interface CategoriaProps {
  _id: string;
  nome: string;
}

export default function CategoriaAll() {

    const [categorias, setCategorias] = React.useState<Array<CategoriaProps>>([]);
    const { register, handleSubmit, reset } = useForm();
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [titleModal, setTitleModal] = React.useState<string>('');
    const [idCategoriaSelect, setIdCategoriaSelect] = React.useState<string>('');
    const [nmCategoria, setNmCategoria] = React.useState<string>('');

    useEffect(() => {
        buscaCategoria();
    }, []);


        async function buscaCategoria() {
        // Aqui você pode fazer uma chamada à API para buscar os dados do piloto
        // Exemplo de chamada fictícia:
        try {
            const response = await fetch("/api/categoria");
            if (!response.ok) {
                throw new Error('Erro ao buscar categorias');
            }
            const data = await response.json();
            setCategorias(data);
        } catch (erro: any) {
            console.error("Erro ao buscar categorias:", erro);
            alert("Erro ao buscar categorias: " + erro.message);
        }
        
    }
    

     
    const hendleAdicionarCategoria = () => {
        setTitleModal('Adicionar Categoria');
        setIsOpen(true);
    }
    const hendleImportarCategoria = () => {
        setTitleModal('Importar Categorias');
        setIsOpen(true);
    }

    function handleFormModal() {
        if(isOpen && titleModal === 'Adicionar Categoria'){
            return <Categoria />;
        }
    }

    return (
        <div className="continerdashboard-all gap-4">
            <Modal isOpen={isOpen} Titulo={titleModal} setOpenModal={()=>setIsOpen(!isOpen)}>
                 {handleFormModal() }
            </Modal>

            <div className="content-top w-100 gap-4">
                <Card className="w-45 mt-2 p-10 continerdashboard-title" >
                    <CardContent className="flex flex-col items-center justify-center">  
                    <h2 className="text-2xl  font-bold mb-4">Categorias</h2>
                    </CardContent>
                </Card>
            </div> 
            <div className="continerdashboard-content p-4">    
                <div className="content-top w-50">
                    <SelectSearchable
                        value={nmCategoria}
                        placeholder="Digite o nome da categoria"
                        options={categorias.map((categoria) => ({
                            value: categoria.nome,
                            label: categoria.nome || '',
                        }))}
                        onSelect={setNmCategoria}

                    />
                </div>            
                <div className="scrollbar">                
                     <table border={1} className="ka-table">
                         <thead>                             
                                 <tr>
                                    <th>Nome</th>
                                     <th>Editar</th>
                                     <th>Excluir</th>
                                 </tr>
                         </thead>
                         <tbody>
                             {categorias.map((categoria, index) => (
                                 <tr key={index} className={nmCategoria === categoria.nome ? "ka-table-select": ""}>    
                                 <td>{categoria.nome}</td>    
                                 <td><button className="component-button-black" onClick={()=>{}}  ><FaEdit /></button></td>
                                 <td><button className="component-button-black" onClick={()=>{}} ><FaTrash /></button></td>
                                 </tr>
                             ))}        
                             
                         </tbody>    
                     </table>
                     
                </div> 
            </div>
            <div className="align-reigth"> 
            <Button className="mt-4 btn-green mr-20" onClick={()=>{hendleImportarCategoria()}}>Replicar</Button>          
            <Button className="mt-4 btn-green mr-20" onClick={()=>{hendleAdicionarCategoria()}}>Adicionar Categoria</Button>
            </div>
        </div>
        
    );
}