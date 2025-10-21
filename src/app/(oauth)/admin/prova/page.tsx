'use client';
import React from "react";
import Button from "@/componets/ui/Buttom";
import { Card, CardContent } from "@/componets/ui/card";
import { Medal, FolderTree, User, Tag, SquareCheckBig, ChartSpline, ChartNoAxesColumn, ChartNoAxesColumnIncreasing, ClipboardList, Settings, UserPen } from "lucide-react";
import '@/componets/stylescorrida.css';
import '@/componets/dashboard.css';
import { useRouter } from "next/navigation";


export default function ProvaPage() {
    const router = useRouter();
  return (
    <div className="continerdashboard">
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
              <li className="flex flex-row items-center btn-active"><Medal className="pr-2" />Inciar Corrida</li>
              <li className="flex flex-row items-center btn"><FolderTree className="pr-2" />Eventos</li>
              <li className="flex flex-row items-center btn"><User className="pr-2" />Pilotos</li>
              <li className="flex flex-row items-center btn"><Tag className="pr-2" />Categorias</li>
              <li className="flex flex-row items-center btn"><SquareCheckBig className="pr-2" />Baterias</li>
              <li className="flex flex-row items-center btn"><ChartSpline className="pr-2" />Cronometragem</li>
              <li className="flex flex-row items-center btn"><ChartNoAxesColumn className="pr-2" />Resultados</li>
              <li className="flex flex-row items-center btn"><ChartNoAxesColumnIncreasing className="pr-2" />Relatório</li>
              <li className="flex flex-row items-center btn"><ClipboardList className="pr-2" />Licenças</li>
              <li className="flex flex-row items-center btn"><Settings className="pr-2" />Configurações</li>
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
                <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Painel de Administração</h1>
                <p className="text-lg mb-6">Gerencie seus eventos, pilotos, categorias e muito mais.</p>
            </div>
        </div>     
      </div>
  );
}
