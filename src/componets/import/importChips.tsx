'use client'
import React, {useState } from "react";
import * as XLSX from 'xlsx';
import {DadosChip} from '@/lib/importArquivos'

/*
interface DadosChip{
    Num: string;
    Tag: string;
}
*/
interface TagFormatada{
  num: string;
  tag: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const ImportChips = () =>{
    const [dados_chp, setDados_Chip] = useState<DadosChip[]>([]);
    const [linhasSelecionadas, setLinhasSelecionada] = useState<number[]>([]);
    const [chipFormatados, setChipsFormatados] = useState<TagFormatada[]>([]);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMenmsagem] = useState('');

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
      
        if(linhasSelecionadas.length === 0){
          return
        }
        setLoading(true);
        setMenmsagem('Salvando...');

        const chips = dados_chp.filter((_, index)=>
          linhasSelecionadas.includes(index)
        );

        const CpForm = chips.map((cp)=>({
          tag:cp.Tag,
          num: cp.Num,
        }))

        setChipsFormatados(CpForm);
        
        await delay(300);
        
        setLinhasSelecionada([]);
        //setDados_Chip([]);
        setLoading(false);
    }
   

    const isMasterCheckBoxCheckd = dados_chp.length > 0 && linhasSelecionadas.length === dados_chp.length

    return (
      <div className="is-flex">
      {/* Input do Arquivo */}
      <div className="w-50 align-left">
        <label className="btn btn-green" htmlFor='arq'>Selecione o arquivo</label>
        <input className="input_oculta" name='arq' id="arq" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
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
                <th>Num (Excel)</th>
                <th>Tags (Excel)</th>
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