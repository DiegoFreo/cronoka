import { NextResponse } from "next/server";
import conectDb from '../../../lib/mongodb';
import LogUsuario from '../../model/logusuario';
import { criarLogUsuario, listarLogUsuarios } from  '../../controller/logUsuarioController';

export async function POST(request) {
    try{
    await conectDb();
    const dados = await request.json();
    const result = await criarLogUsuario(dados);
    return NextResponse.json(result.data || { error: result.error }, { status: result.status });
}    catch(err){
    console.log(err)
    return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
export async function GET() {
  try {
    await conectDb();
    const logusuarios = await LogUsuario.find();
    return NextResponse.json(logusuarios); // ✅ retorno obrigatório
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 }); // ✅ retorno no erro também
  } 
}
