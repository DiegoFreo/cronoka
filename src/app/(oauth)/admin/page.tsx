'use client';
import React from "react";
import Modal from "@/componets/Modal";
import Piloto from "@/componets/cadastro/Piloto";
import Evento from "@/componets/cadastro/evento";
import { Card, CardContent } from "@/componets/ui/card";
import Button from "@/componets/ui/Buttom";
import {UserPen, User, Trophy, FolderTree, MapPin, Tag, SquareCheckBig, ChartSpline, ChartNoAxesColumn, ChartNoAxesColumnIncreasing, ClipboardList, Settings, Medal, Flag, BadgeDollarSign, Pi} from "lucide-react";
import '../../../componets/dashboard.css';
import '../../../componets/styles.css';

import { useRouter } from "next/navigation";

export default function AdminPage() {
  const[isOpen, setIsOpen] = React.useState(false);
  const [formModal, setFormModal] = React.useState('');
  const [titleModal, setTitleModal] = React.useState('');
  const router = useRouter();
  
  const heandleOpenModalPiloto = () => {
    setIsOpen(!isOpen);
    setTitleModal('Cadastro de Piloto');
    setFormModal('piloto');
    console.log(isOpen);
  }
   const heandleOpenModalEvento = () => {
    setIsOpen(!isOpen);
    setTitleModal('Cadastro de Evento');
    setFormModal('evento');
  }

  const heandleFormModal = () => {
    if (formModal === 'piloto') {
      return Piloto();
    }else if (formModal === 'evento') {
      return Evento();
    }
  }

  
  
  return (
      <div className="continerdashboard">
        <Modal isOpen={isOpen} Titulo={titleModal} setOpenModal={()=>setIsOpen(!isOpen)}>
          {heandleFormModal() }
        </Modal>
        <div className="continerdashboard-left">
          <div className="continerdashboard-logo">
            <img
              alt="logo"
              src="./Logo-FPMX.png"
              className="mx-auto h-15 w-auto"
            />
          </div>
          <div className="continerdashboard-menu pt-2">
            <ul>
              <li><Button  onClick={heandleOpenModalPiloto} className="flex flex-row items-center btn "><User  className="pr-2"/>Competidores</Button></li>
              <li><Button  onClick={()=>{router.push('cronometrista/cadastro/piloto')}} className="flex flex-row items-center btn"><UserPen  className="pr-2"/>Usuário</Button></li>
              <li><Button  onClick={()=>{router.push('cronometrista/cadastro/piloto')}} className="flex flex-row items-center btn"><Tag className="pr-2"/>Categoria</Button></li>
              <li><Button  onClick={()=>{router.push('cronometrista/cadastro/piloto')}} className="flex flex-row items-center btn"><SquareCheckBig className="pr-2" />Prova</Button></li>
              <li><Button  onClick={heandleOpenModalEvento} className="flex flex-row items-center btn"><ChartSpline className="pr-2" />Eventos</Button></li>
              <li><Button  onClick={()=>{router.push('cronometrista/cadastro/piloto')}} className="flex flex-row items-center btn"><ChartNoAxesColumnIncreasing className="pr-2" />Relatório</Button></li>
              <li><Button  onClick={()=>{router.push('cronometrista/cadastro/piloto')}} className="flex flex-row items-center btn"><ClipboardList className="pr-2" />Licenças</Button></li>
              <li><Button  onClick={()=>{router.push('cronometrista/cadastro/piloto')}} className="flex flex-row items-center btn"><Settings className="pr-2" />Configurações</Button></li>
              <li><Button  onClick={()=>{router.push('cronometrista/cadastro/piloto')}} className="flex flex-row items-center btn"><Medal className="pr-2" />Modalidade</Button></li>
            </ul>

          </div>
          <div className="continerdashboard-logout pt-4">
            <div className="continerdashboard-logout-perfill">
              <Button className="bg-cronometro btn-corrida">Sair</Button>
              <img
                alt="perfil"
                src="https://github.com/jmarioasilva.png"
                className="mx-auto h-15 w-auto"
              />
            </div>
          </div>
        </div>
        
        <div className="continerdashboard-right gap-4">
          <Card className="w-45 mt-2 h-full p-10 continerdashboard-border continerdashboard-title">
            <CardContent className="flex flex-col items-center justify-center">  
              <h2 className="text-2xl  font-bold mb-4">Administrador</h2>
            </CardContent>
          </Card>
          <Card className="w-45 h-full p-10 mt-4 continerdashboard-border">
            <CardContent className="flex flex-col items-center justify-center">              
              <UserPen className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold mb-4">Usuário</h2>
              <p className="font-color-red">Total - 0</p>
            </CardContent>
          </Card>
          <Card className="w-45 h-full p-10 mt-4 continerdashboard-border">
            <CardContent className="flex flex-col items-center justify-center">
              <User className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold mb-4">Competidor</h2>
               <p className="font-color-red">Total - 0</p>
            </CardContent>
          </Card>
          <Card className="w-45 h-full p-10 mt-4 continerdashboard-border">
            <CardContent className="flex flex-col items-center justify-center">             
              <Trophy className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold mb-4">Eventos</h2>
              <p className="font-color-red">Total - 0</p>
            </CardContent>
          </Card>
           <Card className="w-45 h-full p-10 mt-4 continerdashboard-border">
            <CardContent className="flex flex-col items-center justify-center">
              <FolderTree className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold  mb-4">Categoria</h2>            
              <p className="font-color-red">Total - 0</p>
            </CardContent>
          </Card>
          <Card className="w-45 h-full p-10 mt-4 continerdashboard-border">
            <CardContent className="flex flex-col items-center justify-center">
              <Flag className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold  mb-4">Bateria</h2>              
              <p className="font-color-red">Total - 0</p>
            </CardContent>
          </Card>
          <Card className="w-45 h-full p-10 mt-4 continerdashboard-border">
            <CardContent className="flex flex-col items-center justify-center">
              <BadgeDollarSign className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold  mb-4">Licenças</h2>              
              <p className="font-color-red">Total - 0</p>
            </CardContent>
          </Card>
          <Card className="w-45 h-full p-10 mt-4 continerdashboard-border">
            <CardContent className="flex flex-col items-center justify-center">
              <MapPin className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold  mb-4">Evento</h2>              
              <p className="font-color-red">Total - 0</p>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}