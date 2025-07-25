'use client';
import React from "react";
import { Card, CardContent } from "@/componets/ui/card";
import Button from "@/componets/ui/Buttom";
import {UserPen, User, Trophy, FolderTree, MapPin} from "lucide-react";
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
import { color } from "chart.js/helpers";
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
export const options = {
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
          <div className="continerdashboard-menu pt-4">
            <h2>MENU</h2>
            <ul>
              <li>Competidores</li>
              <li>Usuário</li>
              <li>Categoria</li>
              <li>Prova</li>
              <li>Eventos</li>
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
          <Card className="w-50 h-full">
            <CardContent className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-4">Usuário</h2>
              <UserPen className="w-20 h-20 mb-2 color-cronometro-pause" />
              <Button className="btn-corrida bg-cronometro" onClick={()=>{router.push('/admin/usuario')}} >Incluir</Button>
            </CardContent>
          </Card>
          <Card className="w-50 h-full">
            <CardContent className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-4">Competidor</h2>
              <User className="w-20 h-20 mb-2 color-cronometro-pause" />
              <Button className="btn-corrida bg-cronometro" onClick={()=>{router.push('/cronometrista/cadatro/piloto')}} >Incluir</Button>
            </CardContent>
          </Card>
          <Card className="w-50 h-full">
            <CardContent className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-4">Eventos</h2>
              <Trophy className="w-20 h-20 mb-2 color-cronometro-pause" />
              <Button className="btn-corrida bg-cronometro" onClick={()=>{router.push('/cronometrista/cadatro/prova')}} >Incluir</Button>
            </CardContent>
          </Card>
           <Card className="w-50 h-full">
            <CardContent className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-4">Categoria</h2>
              <FolderTree className="w-20 h-20 mb-2 color-cronometro-pause" />
              <Button className="btn-corrida bg-cronometro" onClick={()=>{router.push('/cronometrista/cadatro/categoria')}} >Incluir</Button>
            </CardContent>
          </Card>
          <Card className="w-50 h-full">
            <CardContent className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-4">Bateria</h2>
              <MapPin className="w-20 h-20 mb-2 color-cronometro-pause" />
              <Button className="btn-corrida bg-cronometro" onClick={()=>{router.push('/cronometrista/cadatro/bateria')}} >Incluir</Button>
            </CardContent>
          </Card>
          <Card className="w-full h-full">
            <CardContent className="flex flex-col items-center justify-center">
              <div className="w-250 h-100 alas-center justify-center flex text-white">
                <Bar data={dados} options={options}/>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
  );
}