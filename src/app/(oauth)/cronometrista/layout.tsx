import type { Metadata } from "next";
import DropDownMenu from "@/componets/Menu";
import {  FaEdit, FaHome} from "react-icons/fa";
import {RequireAuth} from "@/componets/RequireAuth";
import "../../globals.css";

export default function CronometristaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RequireAuth>
        <div className="content">
            <nav className="ka-dropdown">                
                <ul className="ka-dropdown-menu">
                <DropDownMenu link={"/cronometrista"}><FaHome /></DropDownMenu>
                <DropDownMenu lable="Cadastro" link={"#"}>
                    <DropDownMenu lable="Bateria" link={'/cronometrista/cadastro/bateria'}  />  
                    <DropDownMenu lable="Categoria" link={'/cronometrista/cadastro/categoria'} />
                    <DropDownMenu lable="Piloto"  link={'/cronometrista/cadastro/piloto'} />
                </DropDownMenu>
                <DropDownMenu lable="Consulta" link={'#'} >
                    <DropDownMenu lable="Bateria" link={'cronometragem/consulta/bateria'}/>  
                    <DropDownMenu lable="Categoria" link={'cronometragem/consulta/categoria'}/>
                    <DropDownMenu lable="Piloto" link={'cronometragem/consulta/piloto'}/>
                    <DropDownMenu lable="Prova" link={'cronometragem/consulta/prova'}/>
                </DropDownMenu>
                <DropDownMenu lable="Relatório" link={'#'} >
                    <DropDownMenu lable="Bateria" link={'cronometragem/bateria'}/>  
                    <DropDownMenu lable="Categoria" link={'cronometragem/categoria'}/>
                    <DropDownMenu lable="Prova" link={'cronometragem/prova'}/>
                    <DropDownMenu lable="Piloto" link={'cronometragem/piloto'}/>
                </DropDownMenu>
                <DropDownMenu lable="Configurações" link={'#'}  >
                    <DropDownMenu lable="Importações >" link={'#'}>
                        <DropDownMenu lable="Piloto" link=""/>
                        <DropDownMenu lable="TAGS" link=""/>
                        <DropDownMenu lable="Prova" link="configuracao/prova"/>
                    </DropDownMenu>  
                    <DropDownMenu lable="Categoria" link={'cronometrista/categoria'}/>
                    <DropDownMenu lable="Prova" link={'#'} />
                </DropDownMenu>
                <DropDownMenu lable="Corrida" link={'/corrida'} />
                </ul>
            </nav> 
        
            {children}
        </div>
        </RequireAuth>
  );
}
