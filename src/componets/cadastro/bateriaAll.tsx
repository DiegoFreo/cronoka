'use client';
import React from "react";
import{useForm} from "react-hook-form";
import Button from "../ui/Buttom";
import Modal from "../Modal";
import Bateria from "./Bateria";
import '@/componets/styles.css';
import { useEffect } from "react";
import '@/componets/stylescorrida.css';
import '@/componets/dashboard.css';
import '@/componets/styles.css';
import { Card, CardContent } from "../ui/card";
import SelectSearchable from "../ui/SelectSearchable";
import { FaEdit, FaTrash } from "react-icons/fa";

const BateriaAll = () => {
        const { register, handleSubmit, reset } = useForm();
        const [isOpen, setIsOpen] = React.useState<boolean>(false);
        const [titleModal, setTitleModal] = React.useState<string>('');
        const [nmBateria, setNmBateria] = React.useState<string>('');
        const [baterias, setBaterias] = React.useState<Array<any>>([]);
        const [idBateriaSelect, setIdBateriaSelect] = React.useState<string>('');

     useEffect(() => {
        buscaBateria();
    }, []);

    const buscaBateria = async () => {
        try {
            const response = await fetch("/api/bateria");
            if (!response.ok) {
                throw new Error('Erro ao buscar baterias');
            }
            const data = await response.json();
            setBaterias(data);
        } catch (erro: any) {
            console.error("Erro ao buscar baterias:", erro);
            alert("Erro ao buscar baterias: " + erro.message);
        }
    };

   


    const hendleAdicionarBateria = () => {
        setTitleModal('Adicionar Bateria');
        setIsOpen(true);
    }
    
    const handleBateriaSelect = (id: string) => {
        baterias.forEach((bateria) => {
            if (bateria._id === id) {
                setIdBateriaSelect(bateria._id);
                setTitleModal('Editar Baterias');
                setIsOpen(true);
            }
        });
    }


    function handleFormModal() {
        if(titleModal === 'Adicionar Bateria'){
            if(isOpen){
                 return <Bateria  />;
            }else{
                buscaBateria();
            }
        }else if(titleModal === 'Editar Baterias'){
            if(isOpen){
                 return <Bateria _id={idBateriaSelect} />;
            }
        }
    }
    return(
        <div className="continerdashboard-all gap-4">
            <Modal isOpen={isOpen} Titulo={titleModal} setOpenModal={()=>setIsOpen(!isOpen)}>
                 {handleFormModal() }
            </Modal>

            <div className="content-top w-100 gap-4">
                <Card className="w-45 mt-2 p-10 continerdashboard-title" >
                    <CardContent className="flex flex-col items-center justify-center">  
                    <h2 className="text-2xl  font-bold mb-4">Baterias</h2>
                    </CardContent>
                </Card>
            </div> 
            <div className="scrollbar"> 
            <div className="continerdashboard-content p-4">    
                <div className="content-top w-50">
                    <SelectSearchable
                        value={nmBateria}
                        placeholder="Digite o nome da bateria"
                        options={baterias.map((bateria) => ({
                            value: bateria.nome,
                            label: bateria.nome || '',
                        }))}
                        onSelect={setNmBateria}

                    />
                </div>     
                       
                               
                     <table border={1} className="ka-table">
                        <thead>                             
                                 <tr>
                                    <th>Nome</th>
                                     <th>Editar</th>
                                     <th>Excluir</th>
                                 </tr>
                         </thead> 
                          <tbody >
                             {baterias.map((bateria, index) => (
                                 <tr key={index} className={nmBateria === bateria.nome ? "ka-table-select": ""}>    
                                    <td>{bateria.nome}</td>    
                                    <td><button className="component-button-black" onClick={()=>{handleBateriaSelect(bateria._id)}}  ><FaEdit /></button></td>
                                    <td><button className="component-button-black" onClick={()=>{}} ><FaTrash /></button></td>
                                 </tr>
                             ))}        
                             
                         </tbody>  
                     </table>
                     
                </div> 
            </div>
            <div className="align-reigth">         
            <Button className="mt-4 btn-green mr-20" onClick={()=>{hendleAdicionarBateria()}}>Adicionar Bateria</Button>
            </div>
        </div>
    )
}
export default BateriaAll;