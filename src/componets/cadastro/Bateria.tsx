import React, {use, useEffect, useState} from "react";
import Button from "../ui/Buttom";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";
import '@/componets/styles.css';
import '@/componets/stylescorrida.css';
import '@/componets/dashboard.css';
import { Card, CardContent } from "../ui/card";
import SelectSearchable from "../ui/SelectSearchable";
import { set } from "mongoose";

interface BateriaProps {
  _id: string;
  nome: string;
  hora_bateria: string;
}
interface CategoriaProps {
  _id: string;
  nome: string;
}
interface BateriaFormData {
  _id?: string;
}

const Bateria = ({_id}:BateriaFormData) => {
  const { register, handleSubmit, reset } = useForm();
  const [baterias, setBaterias] = useState<BateriaProps[]>([]);
  const [categoriasBateria, setCategoriasBateria] = useState<CategoriaProps[]>([]);
  const [categorias, setCategorias] = useState<CategoriaProps[]>([]);
  const [catId, setCatId] = useState<string>('');
  const [linhasSelecionadas, setLinhasSelecionadas]= useState<number[]>([]);
  const [idBateria, setIdBateria] = useState<string | null>(null);
  const [nomeBateria, setNomeBateria] = useState('');
  const [horaEvento, setHoraEvento] = useState<string>("");
  const [categoriasSelecionadas, setCategoriasSelecionad] = useState<string[]>([]);
  
  useEffect(() => {   
    if(_id){
      fetchBaterias();
    } 
  }, []);
 // Função para buscar baterias 
  const fetchBaterias = async () => {
    try {
      const response = await fetch(`/api/bateria/${_id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar baterias');
      }
      const data = await response.json();
      console.log("baterias", data);
      setBaterias(data.data);
      //data.map((bateria: BateriaProps) => {
        setIdBateria(data.data._id);
        setNomeBateria(data.data.nome);
        setHoraEvento(data.data.hora_inicio || '');
        setCategoriasBateria(data.data.categorias || []);
      //});
    } catch (error:any) {
      console.error("Erro ao buscar baterias:", error);
      alert("Erro ao buscar baterias: " + error.message);
    }
  };

  const handleCheckboxChange = (index: number) => {

        if (linhasSelecionadas.includes(index)) {
            // Se já estava selecionado, remove da lista
            setLinhasSelecionadas(linhasSelecionadas.filter((i) => i !== index));
            alert("Categorias Removida: " + categorias[index].nome);
            setCategoriasSelecionad(categoriasSelecionadas.filter((catId) => catId !== categorias[index]._id));

        } else {
            // Se não estava, adiciona na lista
            setLinhasSelecionadas([...linhasSelecionadas, index]);
            categorias.map((cat, i)=>{
                if(i === index){
                    //setCategoriasPiloto([...categoriasPiloto, cat])
                    setCategoriasSelecionad([...categoriasSelecionadas, cat._id])
                    
                }                
            })
            
            
           //console.log(categoriasSelecionadas);
        }
    };


  const handleChangeNomeBateria = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomeBateria(e.target.value);
  };  
  const handleChangeHoraEvento = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHoraEvento(event.target.value);
  }
  
  const carregarDadosBateria = (id: string) => {
    const bateria = baterias.find(b => b._id === id);
    console.log("baterias", bateria);
    if (bateria) {
      setIdBateria(bateria._id);
      setNomeBateria(bateria.nome);
      setHoraEvento(bateria.hora_bateria || '');
    }
  };
  useEffect(() => {
        if(_id){
            carregarDadosBateria(_id);
        }else if(_id === ''){
             limparFormulario();
        }
      }, [_id]);

  const limparFormulario = () => {  
    setIdBateria(null);
    setNomeBateria('');
    setHoraEvento('');
  };

  
  //Função para buscar categorias
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("/api/categoria");
        if (!response.ok) {
          throw new Error('Erro ao buscar categorias');
        }
        const data = await response.json();
        setCategorias(data);
        setIdBateria(data._id);
        setNomeBateria(data.nome);
        setHoraEvento(data.hora_bateria || '');
      } catch (error:any) {
        console.error("Erro ao buscar categorias:", error);
        alert("Erro ao buscar categorias: " + error.message);
      }
    };
    fetchCategorias();
  }, []);

  
  // Função para lidar com o envio do formulário
  const onSubmit = async () => {
    try {
      if (idBateria) {
        // Atualiza uma bateria existente
        const response = await fetch(`../api/bateria/${idBateria}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({nome: nomeBateria, hora_inicio: horaEvento, categorias: categoriasSelecionadas}),
        });
        alert("Bateria atualizada com sucesso!");
        if (!response.ok) {
          throw new Error('Erro ao atualizar bateria');
        }
      } else {
        const nmBateria = nomeBateria;
        const hora_bateria = horaEvento;
        const data = { nome: nmBateria, hora_inicio: hora_bateria, categorias: categoriasSelecionadas };
        console.log("data", data);
      const response = await fetch("../api/bateria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao cadastrar bateria');
      }
      alert("Bateria cadastrada com sucesso!");
    }
      limparFormulario(); // Limpa o formulário após o envio
    } catch (error:any) {
      console.error("Erro ao cadastrar bateria:", error);
      alert("Erro ao cadastrar bateria: " + error.message);
    }
  }; 
async function deleteBateria(id: string) {
    try {
      const response = await fetch(`/api/bateria/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar bateria');
      }
    } catch (error:any) {
      console.error("Erro ao deletar bateria:", error);
      alert("Erro ao deletar bateria: " + error.message);
    }
  }
  useEffect(() => {
    if(categorias.length > 0 && categoriasBateria.length > 0){
        handleCategoriaPiloto();
        categorias.forEach((cat) => {
            categoriasBateria.forEach((catBateria) => {
                if (cat._id === catBateria._id) {
                    setLinhasSelecionadas((prevSelected) => [...prevSelected, categorias.indexOf(cat)]);
                    setCategoriasSelecionad((prevSelected) => [...prevSelected, cat._id]);
                    //console.log("Categorias do Piloto: " + cat.nome);
                }
            });
      });
    }
  }, [categorias, categoriasBateria]);

  async function handleCategoriaPiloto() {
        try {
            categorias.filter((cat) => {
                categoriasBateria.forEach((catBateria) => {
                    if (cat._id === catBateria._id) {
                        setLinhasSelecionadas((prevSelected) => [...prevSelected, categorias.indexOf(cat)]);
                        setCategoriasSelecionad((prevSelected) => [...prevSelected, cat._id]);
                        //console.log("Categorias do Piloto: " + cat.nome);
                    }
                });
            });
           
        } catch (erro: any) {
            console.error("Erro ao associar categoria ao piloto:", erro);
            alert("Erro ao associar categoria ao piloto: " + erro.message);
        }
    }

  return (
    <div className="is-flex"> 
      <div className="content-form-form w-50">
        {/* Formulário de cadastro de bateria */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-100">
            <label htmlFor="nome">Nome da Bateria:</label>
            <input {...register('nome')} type="text" className="ka-input w-100" value={nomeBateria} onChange={handleChangeNomeBateria} id="nome" name="nome" required />
          </div>
          <div className="w-100">
              <label htmlFor="hora_bateria">Hora da Bateria:</label>
              <input {...register("hora_inicio")} type="time" className="ka-input w-100 center" value={horaEvento} onChange={handleChangeHoraEvento} id="hora_inicio"  name="hora_inicio" required /> 
          </div>
          <div className="ka-modal-footer">
            <Button className="btn btn-green" onClick={handleSubmit(onSubmit)}>Salvar</Button>
            <Button className="btn btn-corrida-reset" onClick={() => limparFormulario()}>Limpar</Button>
          </div>
        </form>
        </div>
      <div className="p-10 w-50">   
             <div className="scrollbar">                
                <table border={1} className="ka-table">
                    <thead>
                        <tr><th colSpan={4} className="ka-table-title" >Tabela Piloto</th></tr>
                            <tr>
                              <th>flag</th>
                              <th>Nome</th>
                            </tr>
                    </thead>
                    <tbody>
                        {categorias.map((cat, index) => (
                                <tr key={cat._id}>  
                                <td>
                                {cat._id === catId ? (
                                    <input type="checkbox" onChange={() =>{handleCheckboxChange(index)}} checked={true} />)  : (
                                    <input type="checkbox" onChange={() => {handleCheckboxChange(index)}} checked={linhasSelecionadas.includes(index)} />
                                    )}
                                </td>
                                <td>{cat.nome}</td>
                                </tr>
                            ))}   
                                           
                                  
                    </tbody>    
                </table>
               </div>
           </div>
    </div>
  );
}
export default Bateria;