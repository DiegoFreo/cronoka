'use client'
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Buttom";
import Modal from "../Modal";
import Evento from "./evento";
import '@/componets/styles.css';
import '@/componets/stylescorrida.css';
import '@/componets/dashboard.css';

interface EventoProps {
    _id: string;
    nome: string;
}

export default function ConfigEventos() {

    const [eventos, setEventos] = React.useState<Array<EventoProps>>([]);
    const { register, handleSubmit, reset } = useForm();
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [titleModal, setTitleModal] = React.useState<string>('');
    const [idEventoSelect, setIdEventoSelect] = React.useState<string>('');
    const [nmEvento, setNmEvento] = React.useState<string>('');
    useEffect(() => {
        buscaEvento();
    }, []);

    const buscaEvento = async () => {
        try {
            const response = await fetch("/api/evento");
            if (!response.ok) {
                throw new Error('Erro ao buscar eventos');
            }
            const data = await response.json();
            setEventos(data);
        } catch (erro: any) {
            console.error("Erro ao buscar eventos:", erro);
            alert("Erro ao buscar eventos: " + erro.message);
        }
    };

    const hendleAdicionarEvento = () => {
        setTitleModal('Adicionar Evento');
        setIsOpen(true);
    }
    const handleEventoSelect = (id: string) => {
        eventos.forEach((evento) => {
            if (evento._id === id) {
                setIdEventoSelect(evento._id);
                setTitleModal('Editar Evento');
                setIsOpen(true);
            }
        });
        }
        return (
        <div className="container">
            <h1>Configurações de Eventos</h1>
            <Button onClick={hendleAdicionarEvento} className="btn btn-primary">Adicionar Evento</Button>

            <table className="table">
                <thead>
                    <tr>
                        <th>Nome do Evento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {eventos.map((evento) => (
                        <tr key={evento._id}>
                            <td>{evento.nome}</td>
                            <td>
                                <Button onClick={() => handleEventoSelect(evento._id)} className="btn btn-secondary">Editar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={isOpen} Titulo={titleModal} setOpenModal={() => setIsOpen(!isOpen)}>
                {isOpen && titleModal === 'Adicionar Evento' && <Evento />}
                {isOpen && titleModal === 'Editar Evento' && <Evento />}
            </Modal>
            </div>
    );
}