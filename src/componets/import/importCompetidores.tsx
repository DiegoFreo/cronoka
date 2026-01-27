import React,{useState, useEffect} from "react";
import * as XLSX from 'xlsx';
import {DadosCompetidor} from '@/lib/importArquivos';
import { set } from "mongoose";
import Button from "../ui/Buttom";


const ImportCompetidores = () =>{
    const [dadosCompetidor, setDadosCompetidor] = useState<DadosCompetidor[]>([]);
    const [linhasSelecionadas, setLinhasSelecionada] = useState<number[]>([]);

    const handleCheckboxChange = (index: number) => {
        if (linhasSelecionadas.includes(index)) {
            // Se já estava selecionado, remove da lista
            setLinhasSelecionada(linhasSelecionadas.filter((i) => i !== index));
        } else {
            // Se não estava, adiciona na lista
            setLinhasSelecionada([...linhasSelecionadas, index]);
        }
    };
    const handleFileUpload =(e: React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        setLinhasSelecionada([]);
        if(!file) return;
        const reander = new FileReader();

        reander.onload = (event) =>{
            const bstr = event.target?.result;
            const workBook = XLSX.read(bstr, {type: 'binary'});
            const workSheepName = workBook.SheetNames[0];
            const workSheet = workBook.Sheets[workSheepName];
            const dadosJson:DadosCompetidor[] = XLSX.utils.sheet_to_json(workSheet);
            console.log('dados Brutos: ', dadosJson );
            setDadosCompetidor(dadosJson);
            setLinhasSelecionada([]);
        }
        reander.readAsBinaryString(file);
    }
     const handleToggleAll = ()=>{
      const todosJaSelecionados = linhasSelecionadas.length === dadosCompetidor.length && dadosCompetidor.length > 0
       if(todosJaSelecionados){
        setLinhasSelecionada([]);
       }else{
        const todosOsIndices = dadosCompetidor.map((_, indice)=>indice);
        setLinhasSelecionada(todosOsIndices);
       }
       
    }
     const isMasterCheckBoxCheckd = dadosCompetidor.length > 0 && linhasSelecionadas.length === dadosCompetidor.length
    return(
        <div>
            <div className="flex justify-start items-center mb-4">
                <label className="btn btn-green mb-10" htmlFor='arq'>Buscar arquivo</label>
                <input className="input_oculta" name='arq' id="arq" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                <Button className="btn btn-green ml-10 mb-10" onClick={()=>{}}>Importar</Button>
            </div>
            
            {/* Tabela de Pré-visualização */}
            <div className="scrollbar">
            <table className="ka-table">
                <thead>
                    <tr>
                        <th><input
                        type="checkbox"
                        checked={isMasterCheckBoxCheckd}
                        onChange={handleToggleAll}
                        /> Todos</th>
                        <th className="border px-4 py-2">Competidor</th>
                        <th className="border px-4 py-2">Categoria</th>
                        <th className="border px-4 py-2">Chips</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Renderizar dados da planilha aqui */}
                    {dadosCompetidor.map((competidor, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: 'center' }}>
                                <input
                                type="checkbox"
                                checked={linhasSelecionadas.includes(index)}
                                onChange={() => handleCheckboxChange(index)}
                                />
                            </td>
                            <td className="border px-4 py-2">{competidor.Nome}</td>
                            <td className="border px-4 py-2">{competidor.Categoria}</td>
                            <td className="border px-4 py-2">{competidor.Chip}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>

    )
}

export default ImportCompetidores;