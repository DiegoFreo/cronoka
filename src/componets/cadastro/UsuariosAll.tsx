import React, {useState, useEffect} from "react";
import { Card, CardContent } from "../ui/card";
import SelectSearchable from "../ui/SelectSearchable";
import Button from "../ui/Buttom";
import Usuario from "./Usuario";
import Modal from "../Modal";

export interface Usuario {
    _id?: string;
    nameUser: string;
    emailUser: string;
    passwordUser: string;
    nivelUser: string;
}
interface UsuariosAllProps {
    usuarios: Usuario[];
}
const UsuariosAll: React.FC<UsuariosAllProps> = ({ usuarios }) => {
     const[usuariosFiltrados, setUsuariosFiltrados] = useState<Usuario[]>(usuarios);
     const[nmUsuario, setNmUsuario] = useState<string>('');
     const[isOpen, setIsOpen] = useState<boolean>(false);
     const[titleModal, setTitleModal] = useState<string>('');
     const[formModal, setFormModal] = useState<string>('');

        useEffect(()=>{

            bustaUsuarios();
        },[]);

     async function bustaUsuarios(){
        try{
            const response = await fetch("/api/usuario");
            if(!response.ok){
                throw new Error('Erro ao buscar usuarios');
            }
            const data = await response.json();
            setUsuariosFiltrados(data);
        }catch(erro:any){
            console.error("Erro ao buscar usuarios: ", erro);
            alert("Erro ao buscar usuarios: " + erro.message);
        }
     }
    const handleOpenModalUsuario = () => {
        setIsOpen(!isOpen);
        setTitleModal('Usuario');
        setFormModal('usuario');
    }
     const handleFormModal = () => {
        switch(formModal){
            case 'usuario':
                return <Usuario />;
            default:
                return null;
        }
        }

    return (
        <div className="continerdashboard-all gap-4">
            <Modal isOpen={isOpen} Titulo={titleModal} setOpenModal={()=>setIsOpen(!isOpen)}>
                    {handleFormModal() }
            </Modal>
             <div className="content-top w-100 gap-4">
                <Card className="w-45 mt-2 p-10 continerdashboard-title" >
                    <CardContent className="flex flex-col items-center justify-center">  
                    <h2 className="text-2xl  font-bold mb-4">Usuário</h2>
                    </CardContent>
                </Card>
            </div> 
            <div className="continerdashboard-content p-4">    
                <div className="content-top w-50">
                    <SelectSearchable
                        value={nmUsuario}
                        placeholder="Digite o nome do usuário"
                        options={usuariosFiltrados.map((usuario) => ({
                            value: usuario.nameUser,
                            label: usuario.nameUser|| '',
                        }))}
                        onSelect={setNmUsuario}

                    />
                </div> 
            <table className="ka-table w-full border-collapse">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-300">Nome</th>
                        <th className="py-2 px-4 border-b border-gray-300">Email</th>
                        <th className="py-2 px-4 border-b border-gray-300">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {usuariosFiltrados.map((usuario) => (
                        <tr key={usuario._id}>
                            <td className="py-2 px-4 border-b border-gray-300">{usuario.nameUser}</td>
                            <td className="py-2 px-4 border-b border-gray-300">{usuario.emailUser}</td>
                            <td className="py-2 px-4 border-b border-gray-300">{usuario.nivelUser}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
            <div className="align-reigth">       
            <Button className="mt-4 btn-green mr-20" onClick={handleOpenModalUsuario}>Adicionar Competidor</Button>
            </div>

        </div>
    );
}
export default UsuariosAll;