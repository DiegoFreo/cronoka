import React, {useEffect, useState} from "react";
import Button from "../ui/Buttom";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";

interface BateriaProps {
  _id: string;
  nome: string;
}

const Bateria = () => {
  const { register, handleSubmit, reset } = useForm();
  const [baterias, setBaterias] = useState<BateriaProps[]>([]);
  const [idBateria, setIdBateria] = useState<string | null>(null);
  const [nomeBateria, setNomeBateria] = useState('');
  const [horaEvento, setHoraEvento] = useState<string>("");

  const handleChangeNomeBateria = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomeBateria(e.target.value);
  };  
  const handleChangeHoraEvento = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHoraEvento(event.target.value);
  }
  
  const carregarDadosBateria = (id: string) => {
    const bateria = baterias.find(b => b._id === id);
    if (bateria) {
      setIdBateria(bateria._id);
      setNomeBateria(bateria.nome);
    }
  };
  const limparFormulario = () => {  
    setIdBateria(null);
    setNomeBateria('');
  };

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
      if (idBateria) {
        // Atualiza uma bateria existente
        const response = await fetch(`/api/bateria/${idBateria}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        alert("Bateria atualizada com sucesso!");
        if (!response.ok) {
          throw new Error('Erro ao atualizar bateria');
        }
      } else {
      const response = await fetch("api/bateria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      alert("Bateria cadastrada com sucesso!");
      if (!response.ok) {
        throw new Error('Erro ao cadastrar bateria');
      }
    }
      limparFormulario(); // Limpa o formulário após o envio
      fetchBaterias(); // Atualiza a lista de baterias
    } catch (error:any) {
      console.error("Erro ao cadastrar bateria:", error);
      alert("Erro ao cadastrar bateria: " + error.message);
    }
  }; 
async function deleteBateria(id: string) {
    try {
      const response = await fetch(`/api/bateria/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar bateria');
      }
      fetchBaterias(); // Atualiza a lista de baterias após a exclusão
    } catch (error:any) {
      console.error("Erro ao deletar bateria:", error);
      alert("Erro ao deletar bateria: " + error.message);
    }
  }

  return (
    <div className="is-flex"> 
      <div className="content-form-form w-50">
        {/* Formulário de cadastro de bateria */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-100">
            <label htmlFor="nome">Nome da Bateria:</label>
            <input {...register('nome')} type="text" className="ka-input w-100" value={nomeBateria} onChange={handleChangeNomeBateria} id="nome" name="nome" required />
          </div>
          <div className="w-100">
              <label htmlFor="hora_bateria">Hora da Bateria:</label>
              <input {...register("hora_bateria")} type="time" className="ka-input w-100 center" value={horaEvento} onChange={handleChangeHoraEvento} id="hora_bateria"  name="hora_bateria" required /> 
          </div>
          <div className="ka-modal-footer">
            <Button className="btn btn-green" onClick={handleSubmit(onSubmit)}>Salvar</Button>
            <Button className="btn btn-corrida-reset" onClick={() => limparFormulario()}>Limpar</Button>
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
                                <td><Button className="btn btn-edit" onClick={()=>carregarDadosBateria(bateria._id)}><FaEdit/></Button></td>
                                <td><Button className="btn btn-delete" onClick={()=>deleteBateria(bateria._id)}><FaTrash /></Button></td>
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