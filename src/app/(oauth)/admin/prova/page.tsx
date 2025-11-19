'use client';
import React, { useState } from "react";
import Button from "@/componets/ui/Buttom";
import { Card, CardContent } from "@/componets/ui/card";
import { Medal, FolderTree, User, Tag, SquareCheckBig, ChartSpline, ChartNoAxesColumn, ChartNoAxesColumnIncreasing, Flag, ClipboardList, Settings, UserPen } from "lucide-react";
import '@/componets/stylescorrida.css';
import '@/componets/dashboard.css';
import '@/componets/styles.css';
import Prova from "@/componets/config/prova";
import { useRouter } from "next/navigation";
import Modal from "@/componets/Modal";

export default function ProvaPage() {
  const[isOpen, setIsOpen] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [formModal, setFormModal] = useState('');

  const openModalProva = () => {
    setTitleModal('Configuração de Prova');
    setFormModal('prova');
    setIsOpen(true);
  }
   const handleFormModal = () => {
    if (formModal === 'prova') {
      if(isOpen){
      return <Prova />; 
      }else{
        return <></>;
      }
    }else{
      return ;
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
             <li onClick={()=>{}} className="flex flex-row items-center btn "><User  className="pr-2"/>Competidores</li>
              <li onClick={()=>{}} className="flex flex-row items-center btn"><UserPen  className="pr-2"/>Usuário</li>
              <li onClick={()=>{}} className="flex flex-row items-center btn"><Tag className="pr-2"/>Categoria</li>
              <li onClick={()=>{}} className="flex flex-row items-center btn"><SquareCheckBig className="pr-2" />Bateria</li>
              <li onClick={()=>{}} className="flex flex-row items-center btn"><ChartSpline className="pr-2" />Eventos</li>
              <li onClick={()=>{}} className="flex flex-row items-center btn"><Flag className="pr-2" />TAGs</li>
              <li onClick={()=>{router.push("./relatorio")}} className="flex flex-row items-center btn"><ChartNoAxesColumnIncreasing className="pr-2" />Relatório</li>
              <li onClick={()=>{}} className="flex flex-row items-center btn"><ClipboardList className="pr-2" />Licenças</li>
              <li onClick={()=>{router.push("./admin/prova")}} className="flex flex-row items-center btn"><Settings className="pr-2" />Configurações</li>
              <li onClick={()=>{router.push("./admin/corrida")}} className="flex flex-row items-center btn"><Medal className="pr-2" />Inciar Corrida</li>
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
                <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Painel de Configuração de Eventos</h1>
                <p className="text-lg mb-6">Gerencie seus eventos</p>
                <ul className="list-disc list-inside mb-6">
                  <li>Crie e edite eventos de corrida</li>
                  <li>Adicione pilotos e categorias</li>
                  <li>Configure baterias e cronometagem</li>
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
