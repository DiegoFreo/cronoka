'use client';
import React from "react";
import { Card, CardContent } from "@/componets/ui/card";
import Button from "@/componets/ui/Buttom";
import {UserPen, User, Trophy, FolderTree, MapPin, Tag, SquareCheckBig, ChartSpline, ChartNoAxesColumn, ChartNoAxesColumnIncreasing, ClipboardList, Settings, Medal, Flag, BadgeDollarSign} from "lucide-react";
import '../../../componets/dashboard.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

import {Bar}from "react-chartjs-2";
import { useRouter } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril'];

const dados = {
  labels,
  datasets: [
    {
      label: 'Eventos',
      data: [5, 3, 3, 5],
      backgroundColor: 'rgba(248, 11, 11, 0.61)',
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 1,
    },
    {
      label: 'Competidores',
      data: [30, 20, 10, 15],
      backgroundColor: 'rgba(102, 255, 161, 0.6)',
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 1,
    },
  ],
};
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,    
      labels: {
        color: 'rgb(255, 255, 255)',
      },  
    },
   
    title: {
      display: true,
      text: 'Eventos e Competidores por Mês',
      color: 'rgb(255, 255, 255)',
    },
  }
};


export default function AdminPage() {

  const router = useRouter();
  
  return (
      <div className="continerdashboard">
        <div className="continerdashboard-left">
          <div className="continerdashboard-logo pb-4">
            <img
              alt="logo"
              src="./logoka.svg"
              className="mx-auto h-15 w-auto"
            />
            <h2 >
              CRONOKA
            </h2>
          </div>
          <div className="continerdashboard-menu pt-2">
            <ul>
              <li><Button  onClick={()=>{router.push('cronometrista/cadastro/piloto')}} className="flex flex-row items-center "><User  className="pr-2"/>Competidores</Button></li>
              <li><Button  onClick={()=>{router.push('cronometrista/cadastro/piloto')}} className="flex flex-row items-center "><UserPen  className="pr-2"/>Usuário</Button></li>
              <li><Button  onClick={()=>{router.push('cronometrista/cadastro/piloto')}} className="flex flex-row items-center "><Tag className="pr-2"/>Categoria</Button></li>
              <li><Button  onClick={()=>{router.push('cronometrista/cadastro/piloto')}} className="flex flex-row items-center "><SquareCheckBig className="pr-2" />Prova</Button></li>
              <li><Button  onClick={()=>{router.push('cronometrista/cadastro/piloto')}} className="flex flex-row items-center "><ChartSpline className="pr-2" />Eventos</Button></li>
              <li><Button  onClick={()=>{router.push('cronometrista/cadastro/piloto')}} className="flex flex-row items-center "><ChartNoAxesColumnIncreasing className="pr-2" />Relatório</Button></li>
              <li><Button  onClick={()=>{router.push('cronometrista/cadastro/piloto')}} className="flex flex-row items-center "><ClipboardList className="pr-2" />Licenças</Button></li>
              <li><Button  onClick={()=>{router.push('cronometrista/cadastro/piloto')}} className="flex flex-row items-center "><Settings className="pr-2" />Configurações</Button></li>
              <li><Button  onClick={()=>{router.push('cronometrista/cadastro/piloto')}} className="flex flex-row items-center "><Medal className="pr-2" />Modalidade</Button></li>
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
        
        <div className="continerdashboard-right">
          <Card className="w-45 h-full">
            <CardContent className="flex flex-col items-center justify-center">              
              <UserPen className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold mb-4">Usuário</h2>
              <p className="color-cronometro-pause">Total - 0</p>
            </CardContent>
          </Card>
          <Card className="w-45 h-full">
            <CardContent className="flex flex-col items-center justify-center">
              <User className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold mb-4">Competidor</h2>
               <p className="color-cronometro-pause">Total - 0</p>
            </CardContent>
          </Card>
          <Card className="w-45 h-full">
            <CardContent className="flex flex-col items-center justify-center">             
              <Trophy className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold mb-4">Eventos</h2>
              <p className="color-cronometro-pause">Total - 0</p>
            </CardContent>
          </Card>
           <Card className="w-45 h-full">
            <CardContent className="flex flex-col items-center justify-center">
              <FolderTree className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold  mb-4">Categoria</h2>            
              <p className="color-cronometro-pause">Total - 0</p>
            </CardContent>
          </Card>
          <Card className="w-45 h-full">
            <CardContent className="flex flex-col items-center justify-center">
              <Flag className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold  mb-4">Bateria</h2>              
              <p className="color-cronometro-pause">Total - 0</p>
            </CardContent>
          </Card>
          <Card className="w-45 h-full">
            <CardContent className="flex flex-col items-center justify-center">
              <BadgeDollarSign className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold  mb-4">Licenças</h2>              
              <p className="color-cronometro-pause">Total - 0</p>
            </CardContent>
          </Card>
          <Card className="w-45 h-full">
            <CardContent className="flex flex-col items-center justify-center">
              <BadgeDollarSign className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold  mb-4">Evento</h2>              
              <p className="color-cronometro-pause">Total - 0</p>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}