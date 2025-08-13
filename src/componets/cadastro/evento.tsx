import React from "react";
import Button from "../ui/Buttom";
import { useForm } from "react-hook-form";


const Evento = () => {
  const { register, handleSubmit} = useForm();
  
  return (
    <div>
      <h2>Cadastro de Evento</h2>
      {/* Formulário de cadastro de evento */}
      <form>
        <div>
          <label htmlFor="nome">Nome do Evento:</label>
          <input type="text" id="nome" name="nome" required />
        </div>
        <div>
          <label htmlFor="data">Data:</label>
          <input type="date" id="data" name="data" required />
        </div>
        <div>
          <label htmlFor="local">Local:</label>
          <input type="text" id="local" name="local" required />
        </div>
        <button type="submit">Cadastrar Evento</button>
      </form>
    </div>
  );
}
export default Evento;