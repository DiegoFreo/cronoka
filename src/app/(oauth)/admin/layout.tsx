"use client";
import { RequireAuth } from "@/componets/RequireAuth";
import "@/app/globals.css";
import "@/componets/stylescorrida.css";
import "@/componets/dashboard.css";
import "@/componets/styles.css";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Modal from "@/componets/Modal";
import ImportChips from "@/componets/import/importChips";
import ConfiguracaoEventos from "@/componets/cadastro/ConfiguracaoEventos";
import Button from "@/componets/ui/Buttom";
import { UserPen, User, Home, Trophy, FolderTree, MapPin, Tag, SquareCheckBig, ChartSpline, ChartNoAxesColumn, ChartNoAxesColumnIncreasing, ClipboardList, Settings, Medal, Flag, BadgeDollarSign, Pi } from "lucide-react";  
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


export default function appLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const imgUser = useContext(AuthContext).users;
  const logout = useContext(AuthContext).logout;
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [formModal, setFormModal] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [imgUsuario, setImgUsuario] = useState<string>('');
  
  useEffect(() => {
    
    if (imgUser && imgUser.avatarUser) {
      setImgUsuario(imgUser.avatarUser);
      
    }
    console.log("Imagem do usuário:", imgUser);
  }, [imgUser]);
  useEffect(() => {
    buscaPiloto();
    buscaUsuario();
  }
    , []);
  // {logout} = useContext(AuthContext);

  const handleImportChip = () => {
    setIsOpen(!isOpen);
    setTitleModal('Importação de Chips');
    setFormModal('importchip');
  }
  
  const handleFormModal = () => {
    switch(formModal) {
      case 'importchip':
        return <ImportChips />;
      default:
        return null;
    }
  }


  const router = useRouter();

  async function buscaPiloto() {
    // Aqui você pode fazer uma chamada à API para buscar os dados do piloto
    // Exemplo de chamada fictícia:
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
  async function buscaUsuario() {
    // Aqui você pode fazer uma chamada à API para buscar os dados do piloto
    // Exemplo de chamada fictícia:
    try {
      const response = await fetch("/api/usuario");
      if (!response.ok) {
        throw new Error('Erro ao buscar usuários');
      }
      const data = await response.json();
    } catch (erro: any) {
      console.error("Erro ao buscar usuários:", erro);
      alert("Erro ao buscar usuários: " + erro.message);
    }
  }
  
  return (
    <RequireAuth> 
            {children}
    </RequireAuth>
  );
}



/*
import { RequireAuth } from "@/componets/RequireAuth";
import "@/app/globals.css";
import "@/components/stylescorrida.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireAuth>{children}</RequireAuth>;
}*/
