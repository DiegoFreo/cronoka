import React from "react";
import {useState, useEffect} from "react";
import Button from "../ui/Buttom";
import { set, useForm } from "react-hook-form";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Bateria, Categoria, Evento } from "@/lib/type";

interface ConfiguracaoEventosProps {
   categoria: Categoria;
   bateria: Bateria;
   evento: Evento
}

const ConfiguracaoEventos = () => {
    const { register, handleSubmit, reset} = useForm();
    const [configuracoes, setConfiguracoes] = useState<ConfiguracaoEventosProps[]>([]);
    const [idConfiguracao, setIdConfiguracao] = useState<number | null >(0);
    const [categoriaId, setCategoriaId] = useState<string>("");
    const [bateriaId, setBateriaId] = useState<string>("");
    const [eventoId, setEventoId] = useState<string>("");


    return (
        <div className="p-4 is-flex">
            <div className="content-form-form w-50">
            
            </div>
        </div>
    );   

}

export default ConfiguracaoEventos;
  