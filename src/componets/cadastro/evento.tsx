import React, {useState, useEffect} from "react";
import Button from "../ui/Buttom";
import { set, useForm } from "react-hook-form";
import { FaTrash, FaEdit } from "react-icons/fa";
import { format } from "path";

interface EventoProps {
  id_evento: number;
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
  // Função para lidar com o envio do formulário
    
  const onSubmit = async (data: any) => {
    
    try {
      const response = await fetch("http://localhost:3030/evento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar evento");
      }

      alert("Evento cadastrado com sucesso!");
      fetchEventos(); // Atualiza a lista de eventos após o cadastro
      reset(); // Limpa o formulário após o envio
    } catch (error:any) {
      console.error("Erro ao cadastrar evento:", error);
      alert("Erro ao cadastrar evento: " + error.message);
    }
  };

  //Functionalidade de listar eventos
   function carregaDadosEventos(id: number){
    eventos.map((evento) => {
      if(evento.id_evento === id){
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
  // Função para buscar eventos
  const fetchEventos = async () => {
    try {
      const response = await fetch("http://localhost:3030/evento");
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
  //funcção assíncrona para atualizar evento
  const updateEvento = async (id: number, updatedData: Partial<EventoProps>) => {
    try {
      const response = await fetch(`http://localhost:3030/evento/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar evento");
      }

      alert("Evento atualizado com sucesso!");
      fetchEventos(); // Atualiza a lista de eventos após a atualização
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
          <div className="w-100 flex is-flex-wrap-wrap">
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
          <Button className="btn btn-corrida-reset" onClick={reset}>Limpar</Button>
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
                    <Button className="btn btn-edit" onClick={() => carregaDadosEventos(evento.id_evento)}>
                      <FaEdit />
                    </Button>
                  </td>
                  <td>
                    <Button className="btn btn-delete">
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