'use client';
import React,{useState, useEffect, useContext} from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/componets/ui/card";
import CompetidorAll from "@/componets/cadastro/competidorAll";
import Modal from "@/componets/Modal";
import Piloto from "@/componets/cadastro/Piloto";
import Evento from "@/componets/cadastro/evento";
import Categoria from "@/componets/cadastro/categoria";
import Bateria from "@/componets/cadastro/Bateria";
import Usuario from "@/componets/cadastro/Usuario";
import ImportChips from "@/componets/import/importChips";
import ConfiguracaoEventos from "@/componets/cadastro/ConfiguracaoEventos";
import Button from "@/componets/ui/Buttom";
import {UserPen, User, Home, Trophy, FolderTree, MapPin, Tag, SquareCheckBig, ChartSpline, ChartNoAxesColumn, ChartNoAxesColumnIncreasing, ClipboardList, Settings, Medal, Flag, BadgeDollarSign, Pi} from "lucide-react";

//import '@/componets/styles.css';
import { useRouter } from "next/navigation";
import { Time } from "tone/build/esm/core/type/Units";

interface EventoProps {
  nome_evento: string;
  descricao_evento: string;
  data_inicio: string;
  data_fim: Date;
  local_evento: string;
  hora_evento: Time;
}



export default function AdminPage() {
  const imgUser = useContext(AuthContext).users;
  const logout = useContext(AuthContext).logout;

  useEffect(() => {
    buscaPiloto();
  }, []);
  // {logout} = useContext(AuthContext);

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
           
        } catch (erro: any) {
            console.error("Erro ao buscar pilotos:", erro);
            alert("Erro ao buscar pilotos: " + erro.message);
        }
    }  
  
  const router = useRouter();

  return (
      <div className="continerdashboard">
       
        <div className="continerdashboard-left">
          <div className="continerdashboard-logo">
            <img
              alt="logo"
              src="../FPMX-logo.png"
              className="mx-auto h-15 w-auto"
            />
          </div>
          <div className="continerdashboard-menu pt-2">
            <ul>
              <li onClick={()=>{router.push("./")}} className="flex flex-row items-center btn"><Home className="pr-2"/>Home</li>
              <li onClick={()=>{}} className="flex flex-row items-center btn active"><User  className="pr-2"/>Competidores</li>
              <li onClick={()=>{}} className="flex flex-row items-center btn"><UserPen  className="pr-2"/>Usuário</li>
              <li onClick={()=>{}} className="flex flex-row items-center btn"><Tag className="pr-2"/>Categoria</li>
              <li onClick={()=>{}} className="flex flex-row items-center btn"><SquareCheckBig className="pr-2" />Bateria</li>
              <li onClick={()=>{}} className="flex flex-row items-center btn"><ChartSpline className="pr-2" />Eventos</li>
              <li onClick={()=>{}} className="flex flex-row items-center btn"><Flag className="pr-2" />TAGs</li>
              <li onClick={()=>{router.push("./relatorio")}} className="flex flex-row items-center btn"><ChartNoAxesColumnIncreasing className="pr-2" />Relatório</li>
              <li onClick={()=>{}} className="flex flex-row items-center btn"><ClipboardList className="pr-2" />Licenças</li>
              <li onClick={()=>{router.push("./prova")}} className="flex flex-row items-center btn"><Settings className="pr-2" />Configurações</li>
              <li onClick={()=>{router.push("./corrida")}} className="flex flex-row items-center btn"><Medal className="pr-2" />Inciar Corrida</li>
            </ul>
          </div>
          <div className="continerdashboard-logout pt-4">
            <div className="continerdashboard-logout-perfill">
              <Button className="bg-cronometro btn-corrida" onClick={()=>{logout()}}>Sair</Button>
              <img
                alt="perfil"
                src= {imgUser?.avatarUser ? imgUser?.avatarUser : "./logoka.vg"}
                className="mx-auto h-15 w-auto"
              />
            </div>
          </div>
        </div>
          <CompetidorAll />
                 
        
      </div>
  );
}