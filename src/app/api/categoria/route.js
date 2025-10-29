import { NextResponse } from "next/server";
import conectDB from '../../../lib/mongodb';
import Categoria from '../../model/categoria';
import { criarCategoria, listarCategorias, atualizarCategoria, deletarCategoria } from  '../../controller/categoriaController'; 
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
export async function PUT(request) {
    try{
    await conectDB();
    const req = await request.json();
    req.params = { id: req.id };    
    const res = {
        status: (status) => ({
            json: (data) => NextResponse.json(data, { status }),    
        }),
    };
    return atualizarCategoria(req, res);
}    catch(err){
    console.log(err)
    return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
export async function DELETE(request) {
    try {
    await conectDB();

    const { id } = await request.json();
   console.log(id);

    if (!id) {
      return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 });
    }

    const resultado = await deletarCategoria(id);

    return NextResponse.json({ message: 'Categoria deletada com sucesso', resultado }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'Erro interno do servidor' }, { status: 500 });
  }
}
