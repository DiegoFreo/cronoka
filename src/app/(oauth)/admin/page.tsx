'use client';
import React,{useState, useEffect} from "react";
import Modal from "@/componets/Modal";
import Piloto from "@/componets/cadastro/Piloto";
import Evento from "@/componets/cadastro/evento";
import Categoria from "@/componets/cadastro/categoria";
import Bateria from "@/componets/cadastro/Bateria";
import Usuario from "@/componets/cadastro/Usuario";
import { Card, CardContent } from "@/componets/ui/card";
import Button from "@/componets/ui/Buttom";
import {UserPen, User, Trophy, FolderTree, MapPin, Tag, SquareCheckBig, ChartSpline, ChartNoAxesColumn, ChartNoAxesColumnIncreasing, ClipboardList, Settings, Medal, Flag, BadgeDollarSign, Pi} from "lucide-react";
import '../../../componets/dashboard.css';
import '../../../componets/styles.css';
import { useRouter } from "next/navigation";




export default function AdminPage() {
  const[isOpen, setIsOpen] = useState(false);
  const [formModal, setFormModal] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [countCompetidores, setCountCompetidores] = useState(0);
  const [countEventos, setCountEventos] = useState(0);
  const [countCategorias, setCountCategorias] = useState(0);
  const [countBaterias, setCountBaterias] = useState(0);
  const [countUsuario, setCountUsuario] = useState(0);

  useEffect(() => {
    buscaPiloto();
    buscaCategoria();
    buscaUsuario();
    buscaBateria();
  }, []);

  async function buscaPiloto() {
        // Aqui você pode fazer uma chamada à API para buscar os dados do piloto
        // Exemplo de chamada fictícia: 
        // const response = await api.get('/pilotos');
        try {
            const response = await fetch("http://localhost:3030/piloto");
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
            const response = await fetch("http://localhost:3030/categoria");
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
            const response = await fetch("http://localhost:3030/user");
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
            const response = await fetch("http://localhost:3030/bateria");
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

  
  const handleOpenModalPiloto = () => {
    setIsOpen(!isOpen);
    setTitleModal('Cadastro de Piloto');
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
      return <Usuario />;
    }else if (formModal === 'categoria') {
      if(isOpen){
      return <Categoria />;
      }
      else{
        buscaCategoria();
      }
    }else if (formModal === 'bateria') {
      return <Bateria />;
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
              src="./Logo-FPMX.png"
              className="mx-auto h-15 w-auto"
            />
          </div>
          <div className="continerdashboard-menu pt-2">
            <ul>
              <li><Button  onClick={handleOpenModalPiloto} className="flex flex-row items-center btn "><User  className="pr-2"/>Competidores</Button></li>
              <li><Button  onClick={handleOpenModalUsuario} className="flex flex-row items-center btn"><UserPen  className="pr-2"/>Usuário</Button></li>
              <li><Button  onClick={handleOpenModalCategoria} className="flex flex-row items-center btn"><Tag className="pr-2"/>Categoria</Button></li>
              <li><Button  onClick={handleOpenModalBateria} className="flex flex-row items-center btn"><SquareCheckBig className="pr-2" />Bateria</Button></li>
              <li><Button  onClick={handleOpenModalEvento} className="flex flex-row items-center btn"><ChartSpline className="pr-2" />Eventos</Button></li>
              <li><Button  onClick={()=>{}} className="flex flex-row items-center btn"><ChartNoAxesColumnIncreasing className="pr-2" />Relatório</Button></li>
              <li><Button  onClick={()=>{}} className="flex flex-row items-center btn"><ClipboardList className="pr-2" />Licenças</Button></li>
              <li><Button  onClick={()=>{}} className="flex flex-row items-center btn"><Settings className="pr-2" />Configurações</Button></li>
              <li><Button  onClick={()=>{router.push("./corrida")}} className="flex flex-row items-center btn"><Medal className="pr-2" />Inciar Corrida</Button></li>
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
          <Card className="w-45 mt-2 h-full p-10 continerdashboard-border continerdashboard-title" >
            <CardContent className="flex flex-col items-center justify-center">  
              <h2 className="text-2xl  font-bold mb-4">Administrador</h2>
            </CardContent>
          </Card>
          <Card className="w-45 h-full p-10 mt-4 continerdashboard-border btn" onClick={handleOpenModalUsuario}>
            <CardContent className="flex flex-col items-center justify-center" >              
              <UserPen className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold mb-4">Usuário</h2>
              <p className="font-color-red">Total - {countUsuario}</p>
            </CardContent>
          </Card>
          <Card className="w-45 h-full p-10 mt-4 continerdashboard-border btn" onClick={handleOpenModalPiloto}>
            <CardContent className="flex flex-col items-center justify-center">
              <User className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold mb-4">Competidor</h2>
               <p className="font-color-red">Total - {countCompetidores}</p>
            </CardContent>
          </Card>
          <Card className="w-45 h-full p-10 mt-4 continerdashboard-border">
            <CardContent className="flex flex-col items-center justify-center">             
              <Trophy className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold mb-4">Eventos</h2>
              <p className="font-color-red">Total - {countEventos}</p>
            </CardContent>
          </Card>
           <Card className="w-45 h-full p-10 mt-4 continerdashboard-border btn" onClick={handleOpenModalCategoria}>
            <CardContent className="flex flex-col items-center justify-center">
              <FolderTree className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold  mb-4">Categoria</h2>            
              <p className="font-color-red">Total - {countCategorias}</p>
            </CardContent>
          </Card>
          <Card className="w-45 h-full p-10 mt-4 continerdashboard-border btn" onClick={handleOpenModalBateria}>
            <CardContent className="flex flex-col items-center justify-center">
              <Flag className="w-20 h-20 mb-2 mt-2 font-bold" />
              <h2 className="text-2xl font-bold  mb-4">Bateria</h2>              
              <p className="font-color-red">Total - {countBaterias}</p>
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
              <p className="font-color-red">Total - {countEventos}</p>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}