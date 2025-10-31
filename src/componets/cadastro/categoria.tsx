import React, {useEffect, useState} from "react";
import Button from "../ui/Buttom";
import{FaTrash, FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";

interface CategoriaProps {
  _id: string;
  nome: string;
}

const Categoria = () => {
  const { register, handleSubmit, reset } = useForm();
  const [categorias, setCategorias] = useState<CategoriaProps[]>([]);
  const [idCategoria, setIdCategoria] = useState("");
  const [dsCategoria, setDsCategoria] = useState("");

  useEffect(() => {
    fetchCategorias();  
  }, []);

  const handleChangeDsCategoria = (e: any)=>{
    setDsCategoria(e.target.value);
  }

  // Função para buscar categorias (simulação)
  const fetchCategorias = async () => {
    try {
      const response = await fetch("/api/categoria");
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
    const categoriaExiste = categorias.some(c => c._id === idCategoria);
    const url = categoriaExiste ? `/api/categoria/${idCategoria}` : "/api/categoria";
    const method = categoriaExiste ? "PUT" : "POST";
    const body = JSON.stringify({ nome: data.nome || dsCategoria });

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (!response.ok) {
      throw new Error(`Erro ao ${categoriaExiste ? "atualizar-" : "cadastrar"} categoria`);
    }

    alert(`Categoria ${categoriaExiste ? "atualizada" : "cadastrada"} com sucesso!`);
    limpar();
    fetchCategorias();

  } catch (error: any) {
    console.error("Erro ao salvar categoria:", error);
    alert("Erro ao salvar categoria: " + error.message);
  }
}
async function limpar() {
  setDsCategoria("");
}

  async function handleOnDelete(id:string){
    try{
     const response = await fetch(`/api/categoria/${id}`, {
                method: 'DELETE',
            });
            console.log(response);
            if(!response.ok){
               throw new Error('Erro ao excluir a Categoria');
            }else{
              alert("Categoria excluído com sucesso!");
              await fetchCategorias(); // Atualiza a lista de categorias
            }
          }catch(err){
            console.log("Erro ao excluir a categoria:", err);
            alert("Erro ao excluir a categoria.")
          }
  }
  function carregarDados(id:any){
    categorias.forEach((Cat)=>{
      if(Cat._id == id){
        setDsCategoria(Cat.nome);
        setIdCategoria(Cat._id);
      }
    })
  }

  return (
    <div className="is-flex">
      <div className="content-form-form  w-50">
        {/* Formulário de cadastro de categoria */}
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="w-100">
            <label htmlFor="nome">Nome da Categoria:</label>
            <input  {...register('nome')} type="text" className="ka-input w-100" value={dsCategoria ?? ''} onChange={handleChangeDsCategoria}   id="nome" name="nome" required />
          </div>
          <div className=" ka-modal-footer">
            <Button className="btn btn-green" onClick={handleSubmit(handleFormSubmit)}>Salvar</Button>
            <Button className="btn btn-corrida-reset" onClick={limpar}>Limpar</Button>
          </div>
        </form>
      </div>
          <div className="p-10 w-50">   
             <div className="scrollbar">                
                <table border={1} className="ka-table">
                    <thead>
                        <tr><th colSpan={4} className="ka-table-title" >Tabela Categoria</th></tr>
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
                                <td>{categoria._id}</td>
                                <td>{categoria.nome}</td>
                                <td><Button className="component-button-black" onClick={()=>carregarDados(categoria._id)}><FaEdit /></Button></td>
                                <td><Button className="component-button-black" onClick={()=>handleOnDelete(categoria._id)}><FaTrash /> </Button></td>
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