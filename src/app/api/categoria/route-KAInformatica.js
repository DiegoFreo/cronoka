import { NextResponse } from "next/server";
import conectDB from '../../../lib/mongodb';
import { criarCategoria, listarCategorias} from  '../../controller/categoriaController'; 

export async function POST(request) {
    try{
    await conectDB();
    const dados = await request.json();
    const result = await criarCategoria(dados);
    return NextResponse.json(result.data || { error: result.error }, { status: result.status });
}    catch(err){
    console.log(err)
    return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
export async function GET() {
  try {
    await conectDB();
    const categorias = await listarCategorias();
    return NextResponse.json(categorias); // ✅ retorno obrigatório
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 }); // ✅ retorno no erro também
  } 
}

