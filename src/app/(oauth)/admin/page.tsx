import React from "react";
import { Card, CardContent } from "@/componets/ui/card";
import Button from "@/componets/ui/Buttom";
import {UserPen, User, Trophy, FolderTree, MapPin} from "lucide-react";
import '../../../componets/dashboard.css';


export default function AdminPage() {
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
                src="./logoka.svg"
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
              <Button className="btn-corrida bg-cronometro" >Incluir</Button>
            </CardContent>
          </Card>
          <Card className="w-50 h-full">
            <CardContent className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-4">Competidor</h2>
              <User className="w-20 h-20 mb-2 color-cronometro-pause" />
              <Button className="btn-corrida bg-cronometro" >Incluir</Button>
            </CardContent>
          </Card>
          <Card className="w-50 h-full">
            <CardContent className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-4">Eventos</h2>
              <Trophy className="w-20 h-20 mb-2 color-cronometro-pause" />
              <Button className="btn-corrida bg-cronometro" >Incluir</Button>
            </CardContent>
          </Card>
           <Card className="w-50 h-full">
            <CardContent className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-4">Categoria</h2>
              <FolderTree className="w-20 h-20 mb-2 color-cronometro-pause" />
              <Button className="btn-corrida bg-cronometro" >Incluir</Button>
            </CardContent>
          </Card>
          <Card className="w-50 h-full">
            <CardContent className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-4">Bateria</h2>
              <MapPin className="w-20 h-20 mb-2 color-cronometro-pause" />
              <Button className="btn-corrida bg-cronometro" >Incluir</Button>
            </CardContent>
          </Card>

        </div>
      </div>
  );
}