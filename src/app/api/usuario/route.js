import { NextResponse } from "next/server";
import conectDb from '../../../lib/mongodb';
import Usuario from '../../model/usuario';
import { criarUsuario, listarUsuarios, atualizarUsuario, deletarUsuario, loginUsuario } from  '../../controller/usuarioController';

export async function POST(request) {
    try{
    await conectDb();
    const dados = await request.json();
    const result = await criarUsuario(dados);
    return NextResponse.json(result.data || { error: result.error }, { status: result.status });
}    catch(err){
    console.log(err)
    return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function GET() {
  try {
    await conectDb();
    const usuarios = await Usuario.find();
    return NextResponse.json(usuarios); // ✅ retorno obrigatório
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 }); // ✅ retorno no erro também
  }
}
   
export async function PUT(request) {
    try{
    await conectDb();
    const req = await request.json();
    req.params = { id: req.id };    
    const res = {
        status: (status) => ({
            json: (data) => NextResponse.json(data, { status }),    
        }),
    };
    return atualizarUsuario(req, res);
}    catch(err){
    console.log(err)
    return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
export async function DELETE(request) {
    try{
    await conectDb();
    const req = await request.json();
    req.params = { id: req.id };    
    const res = {
        status: (status) => ({
            json: (data) => NextResponse.json(data, { status }),    
        }),
    };
    return deletarUsuario(req, res);
}    catch(err){
    console.log(err)
    return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

