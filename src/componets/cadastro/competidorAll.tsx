import React, { useEffect } from "react";
import { Card, CardContent } from "@/componets/ui/card";
import { FaEdit, FaTrash, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useForm } from "react-hook-form";
import SelectSearchable from "@/componets/ui/SelectSearchable";
import Button from "@/componets/ui/Buttom";
import Piloto from "./Piloto";
import importarCompetidores from "@/componets/import/importCompetidores";
import '@/componets/stylescorrida.css';
import '@/componets/dashboard.css';
import '@/componets/styles.css';
import Modal from "../Modal";
import ImportCompetidores from "@/componets/import/importCompetidores";


export default function CompetidorAll() {

    const [piloto, setPiloto] = React.useState<Array<any>>([]);
    const { register, handleSubmit, reset } = useForm();
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [titleModal, setTitleModal] = React.useState<string>('');
    const [idPilotoSelect, setIdPilotoSelect] = React.useState<string>('');
    const [nmPiloto, setNmPiloto] = React.useState<string>('');
    const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);

    useEffect(() => {
        buscatPiloto();
    }, []);
    

    const handleSort = (key: string) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        const sortedPilotos = [...piloto].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setPiloto(sortedPilotos);
    };

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
    const hendleImportarCompetidor = () => {
        setTitleModal('Importar Competidores');
        setIsOpen(true);
    }
    
   const carregarDadosPiloto = (id: string) => {
        piloto.forEach((P) => {
            if (P._id === id) {
                setIdPilotoSelect(P._id);
                setTitleModal('Editar Competidor');
                setIsOpen(true);
                setNmPiloto('');
            }
        });
    }


    function handleFormModal() {
        if(titleModal === 'Adicionar Competidor'){
            if(isOpen){
            return <Piloto />;
            }else{
                buscatPiloto();
            }

        }else if(isOpen && titleModal === 'Editar Competidor'){
            return <Piloto _id={idPilotoSelect} />;
        }else if(titleModal === 'Importar Competidores'){
            if(isOpen){
            return <ImportCompetidores />;
            }else{
                buscatPiloto();
            }
        }
    }

    

    return (
        <div className="continerdashboard-all gap-4">
            <Modal isOpen={isOpen} Titulo={titleModal} setOpenModal={()=>setIsOpen(!isOpen)}>
                 {handleFormModal() }
            </Modal>

            <div className="content-top w-100 gap-4 p-10">
                 <Card className=" mt-2 p-10 continerdashboard-border continerdashboard-title bg-tranparente-30" >
                    <CardContent className="flex flex-col items-center justify-center">  
                    <h2 className="text-2xl  font-bold mb-4 p-10">Competidores</h2>
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
                                    <th onClick={() => handleSort('numero_piloto')} className="cursor-pointer">Número { sortConfig?.direction === 'ascending' && sortConfig.key === 'numero_piloto' ? <FaAngleUp className="inline-block ml-1" /> : <FaAngleDown className="inline-block ml-1" /> } </th>
                                     <th onClick={() => handleSort('nome')} className="cursor-pointer">Nome { sortConfig?.direction === 'ascending' && sortConfig.key === 'nome' ? <FaAngleUp className="inline-block ml-1" /> : <FaAngleDown className="inline-block ml-1" /> } </th>
                                     <th onClick={() => handleSort('tag')} className="cursor-pointer">Chip {sortConfig?.direction === 'ascending' && sortConfig.key === 'tag' ? <FaAngleUp className="inline-block ml-1" /> : <FaAngleDown className="inline-block ml-1" /> } </th>
                                     <th>Editar</th>
                                     <th>Excluir</th>
                                 </tr>
                         </thead>
                         <tbody>
                             {piloto.map((piloto, index) => (
                                piloto.nome.includes(nmPiloto || '') && 

                                 <tr key={index} className={nmPiloto === piloto.nome ? "ka-table-select": ""}>    
                                 <td>{piloto.numero_piloto}</td>  
                                 <td>{piloto.nome}</td>
                                 <td>{piloto.tag}</td>       
                                 <td><button className="component-button-black" onClick={()=>{carregarDadosPiloto(piloto._id)}}  ><FaEdit /></button></td>
                                 <td><button className="component-button-black" onClick={()=>{}} ><FaTrash /></button></td>
                                 </tr>
                             ))}        
                             
                         </tbody>    
                     </table>
                     
                </div> 
            </div>
            <div className="align-reigth"> 
            <Button className="mt-4 btn-green mr-20" onClick={()=>{hendleImportarCompetidor()}}>Importar Competidores</Button>          
            <Button className="mt-4 btn-green mr-20" onClick={()=>{hendleAdicionarCompetidor()}}>Adicionar Competidor</Button>
            </div>
        </div>
        
    );
}