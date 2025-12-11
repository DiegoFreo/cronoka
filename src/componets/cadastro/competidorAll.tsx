import React, { useEffect } from "react";
import { Card, CardContent } from "@/componets/ui/card";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import SelectSearchable from "@/componets/ui/SelectSearchable";
import Button from "@/componets/ui/Buttom";
import Piloto from "./Piloto";

import '@/componets/stylescorrida.css';
import '@/componets/dashboard.css';
import '@/componets/styles.css';
import Modal from "../Modal";
import { Pi } from "lucide-react";


export default function CompetidorAll() {

    const [piloto, setPiloto] = React.useState<Array<any>>([]);
    const { register, handleSubmit, reset } = useForm();
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [titleModal, setTitleModal] = React.useState<string>('');

    

    const [nmPiloto, setNmPiloto] = React.useState<string>('');

    useEffect(() => {
        buscatPiloto();
    }, []);
    

     async function buscatPiloto() {
        // Aqui você pode fazer uma chamada à API para buscar os dados do piloto
        // Exemplo de chamada fictícia: 
        // const response = await api.get('/pilotos');
        try {
            const response = await fetch("/api/piloto");
            if (!response.ok) {
                throw new Error('Erro ao buscar pilotos');
            }
            const data = await response.json();
            setPiloto(data);
           
        } catch (erro: any) {
            console.error("Erro ao buscar pilotos:", erro);
            alert("Erro ao buscar pilotos: " + erro.message);
        }
    }
    const hendleAdicionarCompetidor = () => {
        setTitleModal('Adicionar Competidor');
        setIsOpen(true);
    }
    function handleFormModal() {
        if(isOpen && titleModal === 'Adicionar Competidor'){
            return <Piloto />;
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
                    <h2 className="text-2xl  font-bold mb-4">Competidores</h2>
                    </CardContent>
                </Card>
            </div> 
            <div className="continerdashboard-content p-4">    
                <div className="content-top w-50">
                    <SelectSearchable
                        value={nmPiloto}
                        placeholder="Digite o nome do competidor"
                        options={piloto.map((piloto) => ({
                            value: piloto.nome,
                            label: piloto.nome || '',
                        }))}
                        onSelect={setNmPiloto}
                    />
                </div>            
                <div className="scrollbar">                
                     <table border={1} className="ka-table">
                         <thead>                             
                                 <tr>
                                     <th>Nome</th>
                                     <th>Número Piloto</th>
                                     <th colSpan={2}>Editar/Excluir</th>
                                 </tr>
                         </thead>
                         <tbody>
                             {piloto.map((piloto, index) => (
                                piloto.nome.includes(nmPiloto || '') && 

                                 <tr key={index} className={nmPiloto === piloto.nome ? "ka-table-select": ""}>    
                                 <td>{piloto.nome}</td>
                                 <td>{piloto.numero_piloto}</td>
                                 <td><button className="component-button-black" onClick={()=>{}}  ><FaEdit /></button></td>
                                 <td><button className="component-button-black" onClick={()=>{}} ><FaTrash /></button></td>
                                 </tr>
                             ))}        
                             
                         </tbody>    
                     </table>
                     
                </div> 
            </div>
            <div className="align-reigth">           
            <Button className="mt-4 btn-green " onClick={()=>{hendleAdicionarCompetidor()}}>Adicionar Competidor</Button>
            </div>
        </div>
        
    );
}