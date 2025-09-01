import React from "react";
import {useState, useEffect} from "react";
import Button from "../ui/Buttom";
import { set, useForm } from "react-hook-form";
import { FaTrash, FaEdit } from "react-icons/fa";

interface ConfiguracaoEventosProps {
    categoria_id: number;
    bateria_id: number;
    evento_id: number;
    nome_categoria: string; 
    nome_bateria: string;
    nome_evento: string;
}

const ConfiguracaoEventos = () => {
    const { register, handleSubmit, reset} = useForm();
    const [configuracoes, setConfiguracoes] = useState<ConfiguracaoEventosProps[]>([]);
    const [idConfiguracao, setIdConfiguracao] = useState<number | null >(0);
    const [categoriaId, setCategoriaId] = useState<string>("");
    const [bateriaId, setBateriaId] = useState<string>("");
    const [eventoId, setEventoId] = useState<string>("");


    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Configuração de Eventos</h2>
            <form className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Categoria:</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded"
                        {...register("categoriaId")}
                        value={categoriaId}
                        onChange={(e) => setCategoriaId(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Bateria:</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded"
                        {...register("bateriaId")}
                        value={bateriaId}
                        onChange={(e) => setBateriaId(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Evento:</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded"
                        {...register("eventoId")}
                        value={eventoId}
                        onChange={(e) => setEventoId(e.target.value)}
                    />
                </div>
                <div className="flex space-x-2">
                    <Button onClick={() => {}}>Salvar</Button>
                    <Button onClick={() => {reset(); setCategoriaId(""); setBateriaId(""); setEventoId("");}}>Cancelar</Button>
                </div>
            </form>
            <h3 className="text-xl font-bold mt-8 mb-4">Configurações Existentes</h3>
            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">Categoria</th>
                        <th className="border border-gray-300 p-2">Bateria</th>
                        <th className="border border-gray-300 p-2">Evento</th>
                        <th className="border border-gray-300 p-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {configuracoes.map((config) => (
                        <tr key={config.categoria_id}>
                            <td className="border border-gray-300 p-2">{config.nome_categoria}</td>
                            <td className="border border-gray-300 p-2">{config.nome_bateria}</td>
                            <td className="border border-gray-300 p-2">{config.nome_evento}</td>
                            <td className="border border-gray-300 p-2">
                                <Button onClick={() => {}}>
                                    <FaEdit />
                                </Button>
                                <Button onClick={() => {}}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );   

}

export default ConfiguracaoEventos;
  