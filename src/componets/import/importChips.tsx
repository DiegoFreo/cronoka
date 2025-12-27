'use client'
import React, {useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import {DadosChip} from '@/lib/importArquivos'
import { Flag } from "lucide-react";
import { Select, SelectItem } from "../ui/select";
import { Evento } from "@/lib/type";
import SelectSearchble from "../ui/SelectSearchable";

/*
interface DadosChip{
    Num: string;
    Tag: string;
}
*/
interface eventos{
    _id: string,
    nome_evento: string,
    data_inicio: Date,
    data_fim: Date, 
    hora_evento: string,
    local_evento: string,
    descricao_evento:string
}
interface tagFormatada{
  num: string,
  tag: string,
  flag: boolean,
  evento: eventos[]
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const ImportChips = () =>{
    const [dados_chp, setDados_Chip] = useState<DadosChip[]>([]);
    const [linhasSelecionadas, setLinhasSelecionada] = useState<number[]>([]);
    const [chipFormatados, setChipsFormatados] = useState<tagFormatada[]>([]);
    const [eventoSelecionado, setEventoSelecionado] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [mensagem, setMenmsagem] = useState('');
    const [tagsImportadas, setTagsImportadas] = useState<tagFormatada[]>([]);
    const [evento, setEvento] = useState<eventos[]>([]);

    useEffect(()=>{
      loadDados();
    },[])

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
            const dadosJson:DadosChip[] = XLSX.utils.sheet_to_json(workSheet);

            console.log('dados Brutos: ', dadosJson );
            setDados_Chip(dadosJson);
            setLinhasSelecionada([]);
        }
        reander.readAsBinaryString(file);
    }

    async function loadDados(){
        //buscar os Eventos cadastrados
        const responseEventos = await fetch("/api/evento");
        if(!responseEventos.ok){
            throw new Error("Erro ao buscar os eventos");
        }
        const dataEventos = await responseEventos.json();
        setEvento(dataEventos);
    }
    function handleEvento(e:any){
        const id = e.target.value;
         setEventoSelecionado(id);
    }
    function allEvento(){
       const allevt = evento.map((evnt) => ({
        value: evnt._id,
        label: evnt.nome_evento,
      }));
      return allevt;
    }

    const handleCheckboxChange = (index: number) => {
        if (linhasSelecionadas.includes(index)) {
            // Se já estava selecionado, remove da lista
            setLinhasSelecionada(linhasSelecionadas.filter((i) => i !== index));
        } else {
            // Se não estava, adiciona na lista
            setLinhasSelecionada([...linhasSelecionadas, index]);
        }
    };

    const handleToggleAll = ()=>{
      const todosJaSelecionados = linhasSelecionadas.length === dados_chp.length && dados_chp.length > 0
       if(todosJaSelecionados){
        setLinhasSelecionada([]);
       }else{
        const todosOsIndices = dados_chp.map((_, indice)=>indice);
        setLinhasSelecionada(todosOsIndices);
       }
       
    }
    const handleSalvaChips = async()=>{
      try{
      
        if(linhasSelecionadas.length === 0){
          return
        }
        setLoading(true);
        setMenmsagem('Salvando...');

        const chips = dados_chp.filter((_, index)=>
          linhasSelecionadas.includes(index)
        );

        const evtSelect = evento.find((ev)=>ev._id = eventoSelecionado)  

        const CpForm = chips.map((cp)=>({
          num: cp.Num,
          tag: cp.Tag,
          flag: false,
          evento: evtSelect,    
        }))
        
       const response = await fetch('api/tag/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(CpForm),
    })
    if(!response.ok){
       throw new Error("Erro ao cadastrar tag");
    }else{
       alert("Tags cadastradas com sucesso!");
       setDados_Chip([]);

    }

        
        setLinhasSelecionada([]);
        //setDados_Chip([]);
        setLoading(false);
        setMenmsagem('');
        }
        catch(erro){
          alert("erro ao cadastrar as tags "+erro)
          setLoading(false);
          setMenmsagem('');
        }

    }
   

    const isMasterCheckBoxCheckd = dados_chp.length > 0 && linhasSelecionadas.length === dados_chp.length

    return (
      <div className="is-flex">
      {/* Input do Arquivo */}
      <div className="w-50">
        <div className="w-100 align-left">
        <label className="btn btn-green w-50" htmlFor='arq'>Buscar arquivo</label>
        <input className="input_oculta" name='arq' id="arq" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        
      </div>
        <div className="w-100 align-rigth">
        <Select className="ka-seclect w-50" id="evento" value={eventoSelecionado} onChange={handleEvento} name="nome" required>
            <SelectItem value="">Selecione a Prova</SelectItem>
                {evento.map((evnt, key)=>(
                  <SelectItem key={key} value={evnt._id}>{evnt.nome_evento}</SelectItem>                            
                ))}
          </Select>
          
      </div>

      </div>
      

      {/* Tabela de Pré-visualização */}
      {dados_chp.length > 0 && (
        <div className="w-100">        
          <div className="w-50">
          <p>Selecione as linhas que deseja importar:</p>          
        </div>
        <div className="w-100">
        <div className="scrollbar"> 
          <table className="ka-table">
            <thead>
              <tr className="ka-table-title">
                <th>Selecionar <input
                      type="checkbox"
                      checked={isMasterCheckBoxCheckd}
                      onChange={handleToggleAll}
                    /></th>
                <th>Num</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {dados_chp.map((linha, index) => (
                <tr key={index}>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={linhasSelecionadas.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  {/* Certifique-se que as chaves 'Nome' e 'Email' batem exatamente com o cabeçalho do seu Excel */}
                  <td>{linha.Num}</td>
                  <td>{linha.Tag}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </div>

          {/* Botão de Salvar */}
          <button
            onClick={handleSalvaChips}
            disabled={loading || linhasSelecionadas.length === 0}
           className="btn btn-green"
          >
            {loading ? 'Salvando...' : `Salvar ${linhasSelecionadas.length} Itens Selecionados`}
          </button>
        </div>
      )}

      {/* Mensagens de Feedback */}
      {mensagem && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{mensagem}</p>}
      </div>
  );
 

}
export default ImportChips;