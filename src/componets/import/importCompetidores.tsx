import React,{useState, useEffect, use} from "react";
import * as XLSX from 'xlsx';
import {DadosCompetidor} from '@/lib/importArquivos';
import Button from "../ui/Buttom";
import { Categoria } from "@/lib/type";

interface ImportCategoriasProps {
    categorias: Categoria[];
    onImportar: (competidores: DadosCompetidor[]) => void;
}
type CategoriaSeparada = {
    _id?: string;
    nome: string;
}
interface Piloto {
    nome: string;
    numero_piloto: string;
    cpf?: string;
    nome_equipe?: string;
    filiacao?:  string;
    patrocinador?:  string;   
    dataNascimento?: string;
    telefone?: string;
    responsavel?:  string; 
    tipoSanguineo?:  string;
    categorias: CategoriaSeparada[] | Categoria[] | undefined;
    tag: string[];   
}

const ImportCompetidores = () =>{
    const [dadosCompetidor, setDadosCompetidor] = useState<DadosCompetidor[]>([]);
    const [linhasSelecionadas, setLinhasSelecionada] = useState<number[]>([]);
    const [categoriasDisponiveis, setCategoriasDisponiveis] = useState<Categoria[]>([]);


    // Função para buscar categorias (simulação)
  const fetchCategorias = async () => {
    try {
      const response = await fetch("/api/categoria");
      if (!response.ok) {
        throw new Error('Erro ao buscar categorias');
      }
      const data = await response.json();
      setCategoriasDisponiveis(data);
    } catch (error:any) {
      console.error("Erro ao buscar categorias:", error);
      alert("Erro ao buscar categorias: " + error.message);
    }
  };

  useEffect(() => {
    fetchCategorias();
    }, []);



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
            console.log('dados Brutos: ', dadosJson);
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
    const handleImportar = async()=>{
        try{
        const competidoresParaImportar = linhasSelecionadas.map((index) => dadosCompetidor[index]);
          const competidoresComCategoria = competidoresParaImportar.map((competidor) => {
            const categoriaSeparada:CategoriaSeparada[] = separaCategoria(competidor.Categoria);
            const categoriaEncontrada = categoriasDisponiveis.filter((cat) => categoriaSeparada.some(c => c.nome === cat.nome));

            if (!categoriaEncontrada || categoriaEncontrada.length === 0) {
                //throw new Error(`Categoria "${categoriaSeparada}" não encontrada para o competidor "${competidor.Nome}".`);
                alert(`Categoria "${categoriaSeparada.filter(c => !categoriasDisponiveis.some(cat => cat.nome === c.nome))}" não encontrada para o competidor "${competidor.Nome}".`);
            }
                
            
            return { ...competidor, categorias: categoriaEncontrada}; // Adiciona o ID da categoria ao competidor
        });

        cadastrarCompetidores(competidoresComCategoria);
        
        }catch(erro:any){
            console.error("Erro ao importar competidores: ", erro);
            alert("Erro ao importar competidores: " + erro.message);
        }

    }
    function separaCategoria(categoria: string): CategoriaSeparada[] {
        const categoriaseparada = categoria.split(';').map(cat => cat.trim()).filter(cat => cat !== "");
        return categoriaseparada.map(c => ({ nome: c })) || []; // Retorna as categorias separadas por vírgula
    }
    
    async function cadastrarCompetidores(competidores: any[]) {
        try {

            const categ:Piloto[] = competidores.map((c:DadosCompetidor) =>({
                nome: c.Nome,
                numero_piloto: c.Nº,
                nome_equipe:  undefined,
                filiacao:  undefined,
                patrocinador: c.PATROCINADORES || undefined,
                cpf: undefined,
                dataNascimento: undefined,
                telefone: undefined,
                responsavel: undefined,
                tipoSanguineo:undefined,
                categorias: c.categorias,
                tag: c.Chip,
            }));

            console.log('Competidores a serem cadastrados: ', categ);

                categ.forEach(async(c:Piloto) => {
                const response = await fetch('/api/piloto', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({  
                        nome: c.nome,
                        numero_piloto: c.numero_piloto,
                        nome_equipe:  c.nome_equipe,
                        filiacao:  c.filiacao,
                        patrocinador: c.patrocinador,
                        dataNascimento: c.dataNascimento,
                        telefone: c.telefone,
                        responsavel: c.responsavel,
                        tipoSanguineo: c.tipoSanguineo,
                        categorias: c.categorias,
                        tag: c.tag
                    }), // Envia apenas competidores com categorias válidas
                });
                if (!response.ok) {
                    const detalheErro = await response.text();
                    throw new Error(`Erro do Servidor: ${detalheErro}`);
                }
            
                const data = await response.json();
                });
                console.log('Competidores cadastrados com sucesso:', categ);
                alert('Competidores cadastrados com sucesso! ');
        
        } catch (error:any) {
            console.error('Erro ao cadastrar competidores:', error);
            alert('Erro ao cadastrar competidores: ' + error.message);
        }
    }

     const isMasterCheckBoxCheckd = dadosCompetidor.length > 0 && linhasSelecionadas.length === dadosCompetidor.length
    return(
        <div>
            <div className="flex justify-start items-center mb-4">
                <label className="btn btn-green mb-10" htmlFor='arq'>Buscar arquivo</label>
                <input className="input_oculta" name='arq' id="arq" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                <Button className="btn btn-green ml-10 mb-10" onClick={()=>{handleImportar()}}>Importar</Button>
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
                        <th className=" px-4 py-2">Nº</th>
                        <th className=" px-4 py-2">Competidor</th>
                        <th className=" px-4 py-2">Categoria</th>
                        <th className="px-4 py-2">Chips</th>
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
                            <td className="px-4 py-2">{competidor.Nº}</td>
                            <td className="px-4 py-2 align-left">{competidor.Nome}</td>                            
                            <td className="px-4 py-2">{competidor.Categoria}</td>
                            <td className="px-4 py-2">{competidor.Chip}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>

    )
}

export default ImportCompetidores;