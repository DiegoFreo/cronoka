import React, {useEffect, useState} from "react";
import Button from "../ui/Buttom";
import{FaTrash, FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";

interface CategoriaProps {
  id_categoria: number;
  nome: string;
}

const Categoria = () => {
  const { register, handleSubmit, reset } = useForm();
  const [categorias, setCategorias] = useState<CategoriaProps[]>([]);

  useEffect(() => {
    fetchCategorias();  
  }, []);

  // Função para buscar categorias (simulação)
  const fetchCategorias = async () => {
    try {
      const response = await fetch("http://localhost:3030/api/categoria");
      if (!response.ok) {
        throw new Error('Erro ao buscar categorias');
      }
      const data = await response.json();
      setCategorias(data);
    } catch (error:any) {
      console.error("Erro ao buscar categorias:", error);
      alert("Erro ao buscar categorias: " + error.message);
    }
  };

  // Função para lidar com o envio do formulário
  async function handleFormSubmit(data: any) {
    try {
      const response = await fetch("http://localhost:3030/api/categoria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Erro ao cadastrar categoria');
      }
      reset(); // Limpa o formulário após o envio
      fetchCategorias(); // Atualiza a lista de categorias
    } catch (error:any) {
      console.error("Erro ao cadastrar categoria:", error);
      alert("Erro ao cadastrar categoria: " + error.message);
    }
  };


  return (
    <div className="is-flex">
      <div className="content-form-form  w-50">
        {/* Formulário de cadastro de categoria */}
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="w-100">
            <label htmlFor="nome">Nome da Categoria:</label>
            <input  {...register('nome')} type="text" className="ka-input w-100"  id="nome" name="nome" required />
          </div>
          <div className=" ka-modal-footer">
            <Button className="btn btn-green" onClick={handleSubmit(handleFormSubmit)}>Salvar</Button>
            <Button className="btn btn-corrida-reset" onClick={reset}>Limpar</Button>
          </div>
        </form>
      </div>
          <div className="p-10 w-50">   
             <div className="scrollbar">                
                <table border={1} className="ka-table">
                    <thead>
                        <tr><th colSpan={4} className="ka-table-title" >Tabela Piloto</th></tr>
                            <tr>
                              <th>ID</th>
                              <th>Nome</th>
                              <th>Editar</th>
                              <th>Excluir</th>
                            </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria, index) => (
                            <tr key={index}>
                                <td>{categoria.id_categoria}</td>
                                <td>{categoria.nome}</td>
                                <td><Button className="component-button-black"><FaEdit /></Button></td>
                                <td><Button className="component-button-black"><FaTrash /> </Button></td>
                            </tr>
                        ))}                        
                                  
                    </tbody>    
                </table>
               </div>
           </div>
    </div>
  );
}
export default Categoria;