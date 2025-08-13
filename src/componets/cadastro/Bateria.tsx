import React from "react";
import Button from "../ui/Buttom";
import { useForm } from "react-hook-form";

const Bateria = () => {
  const { register, handleSubmit, reset } = useForm();
  
  const onSubmit = (data: any) => {
    console.log(data);
    // Aqui você pode adicionar a lógica para enviar os dados do formulário
  };

  return (
    <div>
      {/* Formulário de cadastro de bateria */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-100">
          <label htmlFor="nome">Nome da Bateria:</label>
          <input {...register('nome')} type="text" className="ka-input w-100" id="nome" name="nome" required />
        </div>
        <div className=" ka-modal-footer">
          <Button className="btn btn-green" onClick={handleSubmit(onSubmit)}>Salvar</Button>
          <Button className="btn btn-corrida-reset" onClick={reset}>Limpar</Button>
        </div>
      </form>
    </div>
  );
}
export default Bateria;