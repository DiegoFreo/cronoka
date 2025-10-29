import React, {useState, useEffect} from "react";
import Button from "../ui/Buttom";
import { set, useForm } from "react-hook-form";
import { FaTrash, FaEdit } from "react-icons/fa";
import { format } from "path";
import { json } from "stream/consumers";

interface EventoProps {
  _id: string;
  nome_evento: string;
  descricao_evento: string;
  data_inicio: string;
  data_fim: string;
  local_evento: string;
  hora_evento: string;
}


const Evento = () => {
  const { register, handleSubmit, reset} = useForm();
  const [eventos, setEventos] = useState<EventoProps[]>([]);
  const [idEvento, setIdEvento] = useState<string | null >('0');
  const [nomeEvento, setNomeEvento] = useState<string>("");
  const [descricaoEvento, setDescricaoEvento] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
  const [localEvento, setLocalEvento] = useState<string>("");
  const [horaEvento, setHoraEvento] = useState<string>("");

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleChangeNomeEvento = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNomeEvento(event.target.value);
  }
  const handleChangeDescricaoEvento = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescricaoEvento(event.target.value);
  }
  const handleChangeDataInicio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataInicio(event.target.value);
  }
  const handleChangeDataFim = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataFim(event.target.value);
    
  }
  const handleChangeLocalEvento = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalEvento(event.target.value);
  }
  const handleChangeHoraEvento = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHoraEvento(event.target.value);
  }
  function clearForm() {
    setNomeEvento("");
    setDescricaoEvento("");
    setDataInicio("");
    setDataFim("");
    setLocalEvento("");
    setHoraEvento("");
    reset();
  }
  

  //Functionalidade de listar eventos
   function carregaDadosEventos(id: string){
    
    eventos.map((evento) => {
      if(evento._id === id){
        setIdEvento(evento._id);
        setNomeEvento(evento.nome_evento);
        setDescricaoEvento(evento.descricao_evento);        
        const datiniFormatada = new Date(evento.data_inicio);
        setDataInicio(datiniFormatada.toISOString().split('T')[0]);        
        const datfimFormatada = new Date(evento.data_fim);
        setDataFim(datfimFormatada.toISOString().split('T')[0]);
        setLocalEvento(evento.local_evento || "");
        setHoraEvento(evento.hora_evento);
      }
    })
  }
  //Funcionalidade de Excluir evento
  const deleteEvento = async (id: string) => {
    try {
      const response = await fetch(`/api/evento/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir evento");
      }

      alert("Evento excluído com sucesso!");
      fetchEventos(); // Atualiza a lista de eventos após a exclusão
    } catch (error:any) {
      console.error("Erro ao excluir evento:", error);
      alert("Erro ao excluir evento: " + error.message);
    }
  }

  // Função para buscar eventos
  const fetchEventos = async () => {
    try {
      const response = await fetch("/api/evento");
      if (!response.ok) {
        throw new Error('Erro ao buscar eventos');
      }
      const data = await response.json();
      setEventos(data);
    } catch (error:any) {
      console.error("Erro ao buscar eventos:", error);
      alert("Erro ao buscar eventos: " + error.message);
    }
  }
  
  // Função para lidar com o envio do formulário
    
   async function onSubmit(data: any){    
    try {
      if(eventos.map(evento => evento._id === idEvento).includes(true)){
        const Evt = {
          _id: idEvento,
          nome_evento: nomeEvento,
          descricao_evento: descricaoEvento,
          data_inicio: dataInicio,
          data_fim: dataFim,
          local_evento: localEvento,
          hora_evento: horaEvento
        }
        
          updateEvento (idEvento!, Evt);
      }else{
        
      const response = await fetch('/api/evento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
        if (!response.ok) {
          throw new Error("Erro ao cadastrar evento");
        }else{
        alert("Evento cadastrado com sucesso!");
        fetchEventos(); // Atualiza a lista de eventos após o cadastro
        reset(); // Limpa o formulário após o envio
        clearForm();
      } 
    }
  }catch (error:any) {
      console.error("Erro ao cadastrar evento:", error);
      alert("Erro ao cadastrar evento: " + error.message);
    }
  };

  //funcção assíncrona para atualizar evento
  const updateEvento = async (id: string, data: any) => {
    console.log(data);
    try {
      const response = await fetch(`/api/evento/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }     
    );
    return;

      if (!response.ok) {
        throw new Error("Erro ao atualizar evento");
      }else{
        alert("Evento atualizado com sucesso!");
        fetchEventos(); // Atualiza a lista de eventos após a atualização
        clearForm();
      }
      
    } catch (error:any) {
      console.error("Erro ao atualizar evento:", error);
      alert("Erro ao atualizar evento: " + error.message);
    }
  };
  
  return (
    <div className="is-flex">
      <div className="content-form-form w-50">
        {/* Formulário de cadastro de evento */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-100">
            <label htmlFor="nome_evento">Nome do Evento:</label>
            <input className="ka-input w-100" type="text" id="nome_evento" {...register("nome_evento")} value={nomeEvento} onChange={handleChangeNomeEvento} required />
          </div>
          <div className="w-100">
            <label htmlFor="descricao_evento">Descrição:</label>
            <textarea className="ka-input w-100" id="descricao_evento" {...register("descricao_evento")} value={descricaoEvento} onChange={handleChangeDescricaoEvento} required />
          </div>
          <div className="w-100 flex is-flex-wrap-wrap gap-10">
            <div className="w-100">
              <label htmlFor="data_inicio">Data de Início:</label>
              <input type="date" className="ka-input w-100" id="data_inicio" {...register("data_inicio")} value={dataInicio} onChange={handleChangeDataInicio} required />
            </div>
            
            <div className="w-100">
              <label htmlFor="data_fim">Data de Fim:</label>
              <input className="ka-input w-100" type="date" id="data_fim" {...register("data_fim")} value={dataFim }  onChange={handleChangeDataFim} required />
            </div>
            <div className="w-100">
              <label htmlFor="hora_evento">Hora do Evento:</label>
              <input className="ka-input w-100" type="time" id="hora_evento" {...register("hora_evento")} value={horaEvento} onChange={handleChangeHoraEvento} required />
            </div>
          </div>
          <div className="w-100">
            <label htmlFor="local_evento">Local do Evento:</label>
            <input className="ka-input w-100" type="text" id="local_evento" {...register("local_evento")} value={localEvento} onChange={handleChangeLocalEvento} required />
          </div>
          
          <div className="ka-modal-footer">
          <Button className="btn btn-green" onClick={handleSubmit(onSubmit)}>Salvar</Button>
          <Button className="btn btn-corrida-reset" onClick={clearForm}>Limpar</Button>
          </div>
      </form>
      </div>
      <div className="p-10 w-50">
        <div className="scrollbar">
          <table className="ka-table" border={1}>
            <thead >
              <tr>
                <th>Nome do Evento</th>
                <th>Data Início</th>
                <th>Local</th>
                <th colSpan={2}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((evento, index) => (
                <tr key={index}>
                  <td>{evento.nome_evento}</td>
                  <td>{new Date(evento.data_inicio).toISOString().split('T')[0]}</td>
                  <td>{evento.local_evento}</td>
                  <td>
                    <Button className="btn btn-edit" onClick={() => carregaDadosEventos(evento._id)}>
                      <FaEdit />
                    </Button>
                  </td>
                  <td>
                    <Button className="btn btn-delete" onClick={() => deleteEvento(evento._id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Evento;