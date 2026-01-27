'use client';
import React,{useState, useEffect, useContext} from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Modal from "@/componets/Modal";
import Piloto from "@/componets/cadastro/Piloto";
import Evento from "@/componets/cadastro/evento";
import Categoria from "@/componets/cadastro/categoria";
import Bateria from "@/componets/cadastro/Bateria";
import Usuario from "@/componets/cadastro/Usuario";
import ImportChips from "@/componets/import/importChips";
import ConfiguracaoEventos from "@/componets/cadastro/ConfiguracaoEventos";
import { Card, CardContent } from "@/componets/ui/card";
import Button from "@/componets/ui/Buttom";
import {UserPen, User, Home, Trophy, FolderTree, MapPin, Tag, SquareCheckBig, ChartSpline, ChartNoAxesColumn, ChartNoAxesColumnIncreasing, ClipboardList, Settings, Medal, Flag, BadgeDollarSign, Pi} from "lucide-react";
import '@/componets/dashboard.css';
import '@/componets/styles.css';
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
  const[isOpen, setIsOpen] = useState(false);
  const [formModal, setFormModal] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [countCompetidores, setCountCompetidores] = useState(0);
  const [countEventos, setCountEventos] = useState(0);
  const [countCategorias, setCountCategorias] = useState(0);
  const [countBaterias, setCountBaterias] = useState(0);
  const [countUsuario, setCountUsuario] = useState(0);
  const imgUser = useContext(AuthContext).users;
  const logout = useContext(AuthContext).logout;
  const [countProximosEventos, setCountProximosEventos] = useState(0);

  useEffect(() => {
    buscaPiloto();
    buscaCategoria();
    buscaUsuario();
    buscaBateria();
    buscaEventos();    
  }, []);
  // {logout} = useContext(AuthContext);

  function FormatData(data:string){
        const date = new Date(data);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
   }

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
                   if (hoje.getMonth() >= dataInicio.getMonth() && hoje.getFullYear() <= dataFim.getFullYear() && hoje.getDate() <= dataFim.getDate()) {
                    setCountProximosEventos(countProximosEventos + 1);
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

  
  const handleOpenModalPiloto = () => {
    setIsOpen(!isOpen);
    setTitleModal('Cadastro de Competidor');
    setFormModal('piloto');
    console.log(isOpen);
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
  const handleConfiguracaoEventos = () => {
    setIsOpen(!isOpen);
    setTitleModal('Configuração de Eventos');
    setFormModal('configuracaoeventos');
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
              src="./FPMX-logo.png"
              className="mx-auto h-15 w-auto"
            />
          </div>
          <div className="continerdashboard-menu pt-2">
            <ul>
              <li onClick={()=>{router.push("")}} className="flex flex-row items-center btn active"><Home className="pr-2"/>Home</li>
              <li onClick={()=>{router.push("./admin/competidor")}} className="flex flex-row items-center btn "><User  className="pr-2"/>Competidores</li>
              <li onClick={()=>{router.push("./admin/usuario")}} className="flex flex-row items-center btn"><UserPen  className="pr-2"/>Usuário</li>
              <li onClick={handleOpenModalCategoria} className="flex flex-row items-center btn"><Tag className="pr-2"/>Categoria</li>
              <li onClick={handleOpenModalBateria} className="flex flex-row items-center btn"><SquareCheckBig className="pr-2" />Bateria</li>
              <li onClick={handleOpenModalEvento} className="flex flex-row items-center btn"><ChartSpline className="pr-2" />Eventos</li>
              <li onClick={handleImportChip} className="flex flex-row items-center btn"><Flag className="pr-2" />TAGs</li>
              <li onClick={()=>{router.push("./admin/relatorio")}} className="flex flex-row items-center btn"><ChartNoAxesColumnIncreasing className="pr-2" />Relatório</li>
              <li onClick={()=>{}} className="flex flex-row items-center btn"><ClipboardList className="pr-2" />Licenças</li>
              <li onClick={()=>{router.push("./admin/prova")}} className="flex flex-row items-center btn"><Settings className="pr-2" />Configurações</li>
              <li onClick={()=>{router.push("./admin/corrida")}} className="flex flex-row items-center btn"><Medal className="pr-2" />Inciar Corrida</li>
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
        
        <div className="continerdashboard-right gap-4">
          <Card className=" mt-2 p-10 continerdashboard-border continerdashboard-title bg-tranparente-30" >
            <CardContent className="flex flex-col items-center justify-center">  
              <h2 className="text-2xl  font-bold mb-4">Administrador</h2>
            </CardContent>
          </Card>
          <Card className="w-45 p-10 mt-4 continerdashboard-border btn bg-tranparente-30" onClick={handleOpenModalUsuario}>
            <CardContent className="flex flex-col items-center justify-center" >              
              <UserPen className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold text-center mb-4">Usuário</h2>
              <p className="font-color-red">Total - {countUsuario}</p>
            </CardContent>
          </Card>
          <Card className="w-45 p-10 mt-4 continerdashboard-border btn bg-tranparente-30" onClick={handleOpenModalPiloto}>
            <CardContent className="flex flex-col items-center justify-center">
              <User className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold text-center mb-4">Competidor</h2>
               <p className="font-color-red">Total - {countCompetidores}</p>
            </CardContent>
          </Card>
          <Card className="w-45 p-10 mt-4 continerdashboard-border btn bg-tranparente-30" onClick={handleOpenModalEvento}>
            <CardContent className="flex flex-col items-center justify-center">             
              <Trophy className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold text-center mb-4">Eventos</h2>
              <p className="font-color-red">Total - {countEventos}</p>
            </CardContent>
          </Card>
           <Card className="w-45 p-10 mt-4 continerdashboard-border btn bg-tranparente-30" onClick={handleOpenModalCategoria}>
            <CardContent className="flex flex-col items-center justify-center">
              <FolderTree className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold text-center mb-4">Categoria</h2>            
              <p className="font-color-red">Total - {countCategorias}</p>
            </CardContent>
          </Card>
          <Card className="w-45 p-10 mt-4 continerdashboard-border btn bg-tranparente-30" onClick={handleOpenModalBateria}>
            <CardContent className="flex flex-col items-center justify-center">
              <Flag className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold text-center mb-4">Bateria</h2>              
              <p className="font-color-red">Total - {countBaterias}</p>
            </CardContent>
          </Card>
          <Card className="w-45 p-10 mt-4 continerdashboard-border btn bg-tranparente-30">
            <CardContent className="flex flex-col items-center justify-center">
              <BadgeDollarSign className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold text-center mb-4">Licenças</h2>              
              <p className="font-color-red">Total - 0</p>
            </CardContent>
          </Card>
          <Card className="w-45 p-10 mt-4 continerdashboard-border btn bg-tranparente-30">
            <CardContent className="flex flex-col items-center justify-center">
              <MapPin className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold text-center mb-4">Proximo Evento</h2>              
              <p className="font-color-red">Total - {countProximosEventos}</p>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}