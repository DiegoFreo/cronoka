'use client';
import React, { useState, useEffect } from "react";
import Button from "@/componets/ui/Buttom";
import Piloto from "@/componets/cadastro/Piloto";
import Evento from "@/componets/cadastro/evento";
import Categoria from "@/componets/cadastro/categoria";
import Bateria from "@/componets/cadastro/Bateria";
import Usuario from "@/componets/cadastro/Usuario";
import ImportChips from "@/componets/import/importChips";
import ConfiguracaoEventos from "@/componets/cadastro/ConfiguracaoEventos";
import { Card, CardContent } from "@/componets/ui/card";
import { Medal, FolderTree, User, Tag, SquareCheckBig, ChartSpline, ChartNoAxesColumn, ChartNoAxesColumnIncreasing, Flag, ClipboardList, Settings, UserPen } from "lucide-react";
import '@/componets/stylescorrida.css';
import '@/componets/dashboard.css';
import '@/componets/styles.css';
import Prova from "@/componets/config/prova";
import { useRouter } from "next/navigation";
import Modal from "@/componets/Modal";
import { Time } from "tone/build/esm/core/type/Units";

interface EventoProps {
  nome_evento: string;
  descricao_evento: string;
  data_inicio: string;
  data_fim: Date;
  local_evento: string;
  hora_evento: Time;
}

export default function ProvaPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [formModal, setFormModal] = useState('');
  const [countCompetidores, setCountCompetidores] = useState(0);
  const [countEventos, setCountEventos] = useState(0);
  const [countCategorias, setCountCategorias] = useState(0);
  const [countBaterias, setCountBaterias] = useState(0);
  const [countUsuario, setCountUsuario] = useState(0);
  const [countProximosEventos, setCountProximosEventos] = useState(0);

useEffect(() => {
    buscaPiloto();
    buscaCategoria();
    buscaUsuario();
    buscaBateria();
    buscaEventos();    
  }, []);
  // {logout} = useContext(AuthContext);

  async function buscaEventos() {
        try {
            const response = await fetch("/api/evento");
            if (!response.ok) {
                throw new Error('Erro ao buscar eventos');
            }
            const data = await response.json();
            setCountEventos(data.length);
            if(data.length > 0){
                data.forEach((evento: EventoProps) => {
                   const dataInicio = new Date(evento.data_inicio);
                   const dataFim = new Date(evento.data_fim);
                   const hoje = new Date();
                   if (hoje >= dataInicio && hoje <= dataFim) {
                    setCountProximosEventos(countProximosEventos + 1);
                    alert(`Evento em andamento: ${dataInicio}`);      
                    
                  }
                                  
                });
            }
            
        } catch (error:any) {
            console.error("Erro ao buscar eventos:", error);
            alert("Erro ao buscar eventos: " + error.message);
        }
    }

  async function buscaPiloto() {
        // Aqui você pode fazer uma chamada à API para buscar os dados do piloto
        // Exemplo de chamada fictícia: 
        // const response = await api.get('/pilotos');
        
        try {
            const response = await fetch("/api/piloto");
            if (!response.ok) {
                throw new Error('Erro ao buscar pilotos');
            }
            const data = await response.json();
            setCountCompetidores(data.length);
           
        } catch (erro: any) {
            console.error("Erro ao buscar pilotos:", erro);
            alert("Erro ao buscar pilotos: " + erro.message);
        }
    }
    async function buscaCategoria() {
        try {
            const response = await fetch("/api/categoria");
            if (!response.ok) {
                throw new Error('Erro ao buscar categorias');
            }
            const data = await response.json();
            setCountCategorias(data.length);
        } catch (erro: any) {
            console.error("Erro ao buscar categorias:", erro);
            alert("Erro ao buscar categorias: " + erro.message);
        }
      
    }

    const buscaUsuario = async () => {
        try {
            const response = await fetch("/api/usuario");
            if (!response.ok) {
                throw new Error('Erro ao buscar usuários');
            }
            const data = await response.json();
            setCountUsuario(data.length);            
            
        } catch (error:any) {
            console.error("Erro ao buscar usuários:", error);
            alert("Erro ao buscar usuários: " + error.message);
        }
    };
    const buscaBateria = async () => {
        try {
            const response = await fetch("/api/bateria");
            if (!response.ok) {
                throw new Error('Erro ao buscar baterias');
            }
            const data = await response.json();
            setCountBaterias(data.length);
        } catch (error:any) {
            console.error("Erro ao buscar baterias:", error);
            alert("Erro ao buscar baterias: " + error.message);
        }
    };
    const buscaConfiguracaoEvento = async () => {
        try {
            const response = await fetch("/api/evento");
            if (!response.ok) {
                throw new Error('Erro ao buscar configurações de eventos');
            }
            const data = await response.json();
            // Aqui você pode fazer algo com os dados buscados, como armazená-los em um estado
            console.log(data);
        } catch (error:any) {
            console.error("Erro ao buscar configurações de eventos:", error);
            alert("Erro ao buscar configurações de eventos: " + error.message);
        }
    };



  const openModalProva = () => {
    setTitleModal('Configuração de Prova');
    setFormModal('prova');
    setIsOpen(true);
  }
  const handleOpenModalPiloto = () => {
    setIsOpen(!isOpen);
    setTitleModal('Cadastro de Competidor');
    setFormModal('piloto');
  }
  const handleOpenModalEvento = () => {
    setIsOpen(!isOpen);
    setTitleModal('Cadastro de Evento');
    setFormModal('evento');
  }
  const handleOpenModalUsuario = () => {
    setIsOpen(!isOpen);
    setTitleModal('Usuario');
    setFormModal('usuario');
  }
  const handleOpenModalCategoria = () => {
    setIsOpen(!isOpen);
    setTitleModal('Categoria');
    setFormModal('categoria');
  }
  const handleOpenModalBateria = () => {
    setIsOpen(!isOpen);
    setTitleModal('Bateria');
    setFormModal('bateria');
  }
  const handleImportChip = ()=>{
    setIsOpen(!isOpen);
    setTitleModal('Importação de Chips');
    setFormModal('importchip');
  }

  const handleFormModal = () => {
    if (formModal === 'piloto') {
      if(isOpen){
      return <Piloto />;
      }else{
        buscaPiloto()
      }
    }else if (formModal === 'evento') {
      return <Evento />;
    }else if (formModal === 'usuario') {
      if(isOpen){
      return <Usuario />;
      }
      else{
        buscaUsuario();
      }
    }else if (formModal === 'categoria') {
      if(isOpen){
      return <Categoria />;
      }
      else{
        buscaCategoria();
      }
    }else if (formModal === 'bateria') {
      if(isOpen){
      return <Bateria />;
      }else{
        buscaBateria();
      }
    }else if (formModal === 'configuracaoeventos') {
      if(isOpen){
      return <ConfiguracaoEventos />;
      }
      else{
        buscaConfiguracaoEvento();
      }
    }else if(formModal === 'importchip'){
      if(isOpen){
        return <ImportChips/>
      }
    }else if (formModal === 'prova') {
      if(isOpen){
      return <Prova />; 
      }else{
        return <></>;
      }
  }
}

  const router = useRouter();
  return (
    <div className="continerdashboard">
       <Modal isOpen={isOpen} Titulo={titleModal} setOpenModal={()=>setIsOpen(!isOpen)}>
                {handleFormModal() }
        </Modal>

        <div className="continerdashboard-left">
          <div className="continerdashboard-logo">
            <img
              alt="logo"
              src="../../FPMX-logo.png"
              className="mx-auto h-15 w-auto"
            />
          </div>
          <div className="continerdashboard-menu">
           <ul>
                <li onClick={handleOpenModalPiloto} className="flex flex-row items-center btn "><User  className="pr-2"/>Competidores</li>
                <li onClick={handleOpenModalUsuario} className="flex flex-row items-center btn"><UserPen  className="pr-2"/>Usuário</li>
                <li onClick={handleOpenModalCategoria} className="flex flex-row items-center btn"><Tag className="pr-2"/>Categoria</li>
                <li onClick={handleOpenModalBateria} className="flex flex-row items-center btn"><SquareCheckBig className="pr-2" />Bateria</li>
                <li onClick={handleOpenModalEvento} className="flex flex-row items-center btn"><ChartSpline className="pr-2" />Eventos</li>
                <li onClick={handleImportChip} className="flex flex-row items-center btn"><Flag className="pr-2" />TAGs</li>
                <li onClick={()=>{router.push("./relatorio")}} className="flex flex-row items-center btn"><ChartNoAxesColumnIncreasing className="pr-2" />Relatório</li>
                <li onClick={()=>{}} className="flex flex-row items-center btn"><ClipboardList className="pr-2" />Licenças</li>
                <li onClick={()=>{router.push("./prova")}} className="flex flex-row items-center btn"><Settings className="pr-2" />Configurações</li>
                <li onClick={()=>{router.push("./corrida")}} className="flex flex-row items-center btn"><Medal className="pr-2" />Inciar Corrida</li>
            </ul>
          </div>
          <div className="continerdashboard-logout pt-4">
            <Button  className="w-full justify-start">
              <UserPen className="mr-2" />
              Sair
            </Button>
          </div>
         
        </div>  
        <div className="continerdashboard-prova gap-4">
           <Card className="w-45 mt-2 p-10 continerdashboard-border continerdashboard-title bg-tranparente-30" >
            <CardContent className="flex flex-col items-center justify-center">  
              <h2 className="text-2xl  font-bold mb-4">Configuração de Prova</h2>
            </CardContent>
          </Card>
            <div className="continerdashboard-content p-4">
                <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Painel de Configuração de Prova</h1>
                <p className="text-lg mb-6">Gerenciar Prova</p>
                <ul className="list-disc list-inside mb-6">
                  <li>Crie e edite eventos de corrida</li>
                  <li>Adicione pilotos e categorias</li>
                  <li>Configure baterias</li>
                  <li>Visualize resultados e relatórios</li>
                </ul>
                <Button onClick={openModalProva} className="btn btn-corrida">
                  Configurar Novo Evento
                </Button>
            </div>
        </div>     
      </div>
  );
}
