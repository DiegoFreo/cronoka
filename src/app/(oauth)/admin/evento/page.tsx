'use client';
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/componets/Modal";;
import Button from "@/componets/ui/Buttom";
import {Home, User, UserPen, Tag, SquareCheckBig, ChartSpline, Flag, ChartNoAxesColumnIncreasing, ClipboardList, Settings, Medal} from "lucide-react";
import { AuthContext } from "@/contexts/AuthContext";

import '@/componets/styles.css';
//import '@/componets/stylescorrida.css';
import '@/componets/dashboard.css';
import { Card, CardContent } from "@/componets/ui/card";



const EventoPage = () => {
    const router = useRouter();
     const logout = useContext(AuthContext).logout;
     const [imgUsuario, setImgUsuario] = useState<string>('');


    return(
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
                <li onClick={()=>{router.push("../admin")} } className='flex flex-row items-center btn'><Home className="pr-2"/>Home</li>
                <li onClick={()=>{router.push("../admin/competidor")}} className="flex flex-row items-center btn "><User  className="pr-2"/>Competidores</li>
                <li onClick={()=>{router.push("../admin/usuario")}} className="flex flex-row items-center btn"><UserPen  className="pr-2"/>Usuário</li>
                <li onClick={()=>{router.push("../admin/categoria")}} className="flex flex-row items-center btn"><Tag className="pr-2"/>Categoria</li>
                <li onClick={()=>{router.push("../admin/bateria")}} className="flex flex-row items-center btn"><SquareCheckBig className="pr-2" />Bateria</li>
                <li onClick={()=>{router.push("../admin/evento")}} className="flex flex-row items-center btn active"><ChartSpline className="pr-2" />Eventos</li>
                <li onClick={()=>{router.push("../admin/tag")}} className="flex flex-row items-center btn"><Flag className="pr-2" />TAGs</li>
                <li onClick={()=>{router.push("../admin/relatorio")}} className="flex flex-row items-center btn"><ChartNoAxesColumnIncreasing className="pr-2" />Relatório</li>
                <li onClick={()=>{}} className="flex flex-row items-center btn"><ClipboardList className="pr-2" />Licenças</li>
                <li onClick={()=>{router.push("../admin/prova")}} className="flex flex-row items-center btn"><Settings className="pr-2" />Configurações</li>
                <li onClick={() => window.open("../admin/corrida", "_blank")} className="flex flex-row items-center btn"><Medal className="pr-2" />Inciar Corrida</li>
                </ul>
            </div>
            
            <div className="continerdashboard-logout pt-4">
                <div className="continerdashboard-logout-perfill">
                <Button className="bg-cronometro btn-corrida" onClick={()=>{logout()}}>Sair</Button>
                <img
                    alt="perfil"
                    src= {imgUsuario ? imgUsuario : "../logoka.svg"}
                    className="mx-auto h-15 w-auto"
                />
                </div>
            </div>
            </div>
            <div className="continerdashboard-right gap-4 flex-wrap justify-starth">
                 <Card className=" mt-2 p-10 continerdashboard-border continerdashboard-title bg-tranparente-30" >
                    <CardContent className="flex flex-col items-center justify-center">  
                        <h2 className="text-2xl  font-bold mb-4">Eventos</h2>
                    </CardContent>
                </Card>

            </div>
        </div>

        
    )
}
export default EventoPage;