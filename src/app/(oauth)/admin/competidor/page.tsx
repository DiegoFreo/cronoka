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
  const[isOpen, setIsOpen] = useState(false);
  const [formModal, setFormModal] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [imgUsuario, setImgUsuario] = useState<string>('');


  useEffect(() => {
    buscaPiloto();
    buscaUsuario();
  }, []);
  // {logout} = useContext(AuthContext);

  const handleImportChip = ()=>{
    setIsOpen(!isOpen);
    setTitleModal('Importação de Chips');
    setFormModal('importchip');
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
           
        } catch (erro: any) {
            console.error("Erro ao buscar pilotos:", erro);
            alert("Erro ao buscar pilotos: " + erro.message);
        }
    } 
     const buscaUsuario = async () => {
        try {
            const response = await fetch("/api/usuario");
            if (!response.ok) {
                throw new Error('Erro ao buscar usuários');
            }
            const data = await response.json();
            setImgUsuario(data.length > 0 ? data[0].avatarUser : '');
                      
            
        } catch (error:any) {
            console.error("Erro ao buscar usuários:", error);
            alert("Erro ao buscar usuários: " + error.message);
        }
    };
    
    const handleFormModal = () => {
    if (formModal === 'piloto') {
      if(isOpen){
      return <Piloto />;
      }else{
        buscaPiloto()
      }
    }else if (formModal === 'evento') {
      return <Evento />;
    }else if(formModal === 'importchip'){
      if(isOpen){
        return <ImportChips/>
      }
    }
  }
  
  const router = useRouter();

  return (
          <CompetidorAll />     
  );
}