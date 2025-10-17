import React, {useEffect, useState} from "react";
import Button from "../ui/Buttom";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";

interface BateriaProps {
  _id: number;
  nome: string;
}

const Bateria = () => {
  const { register, handleSubmit, reset } = useForm();
  const [baterias, setBaterias] = useState<BateriaProps[]>([]);
  useEffect(() => {
    fetchBaterias();
  }, []);
  // Função para buscar baterias
  const fetchBaterias = async () => {
    try {
      const response = await fetch("/api/bateria");
      if (!response.ok) {
        throw new Error('Erro ao buscar baterias');
      }
      const data = await response.json();
      setBaterias(data);
    } catch (error:any) {
      console.error("Erro ao buscar baterias:", error);
      alert("Erro ao buscar baterias: " + error.message);
    }
  };
  // Função para lidar com o envio do formulário
  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("api/bateria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Erro ao cadastrar bateria');
      }
      reset(); // Limpa o formulário após o envio
      fetchBaterias(); // Atualiza a lista de baterias
    } catch (error:any) {
      console.error("Erro ao cadastrar bateria:", error);
      alert("Erro ao cadastrar bateria: " + error.message);
    }
  }; 


  return (
    <div className="is-flex"> 
      <div className="content-form-form w-50">
        {/* Formulário de cadastro de bateria */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-100">
            <label htmlFor="nome">Nome da Bateria:</label>
            <input {...register('nome')} type="text" className="ka-input w-100" id="nome" name="nome" required />
          </div>
          <div className="ka-modal-footer">
            <Button className="btn btn-green" onClick={handleSubmit(onSubmit)}>Salvar</Button>
            <Button className="btn btn-corrida-reset" onClick={() => reset()}>Limpar</Button>
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
                        {baterias.map((bateria, index) => (
                            <tr key={index}>
                                <td>{bateria._id}</td>
                                <td>{bateria.nome}</td>
                                <td><Button className="btn btn-edit"><FaEdit/></Button></td>
                                <td><Button className="btn btn-delete"><FaTrash /></Button></td>
                            </tr>
                        ))}
                                           
                                  
                    </tbody>    
                </table>
               </div>
           </div>
    </div>
  );
}
export default Bateria;