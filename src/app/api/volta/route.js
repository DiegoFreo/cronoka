import { NextResponse } from "next/server";
import conectDB from '../../../lib/mongodb';
import Volta from '../../model/volta';
import { criarVolta, listarVoltas, atualizarVolta, deletarVolta } from  '../../controller/voltaController';

export async function POST(request) {
    try{
    await conectDB();
    const dados = await request.json();
    const result = await criarVolta(dados);
    return NextResponse.json(result.data || { error: result.error }, { status: result.status });
}    catch(err){
    console.log(err)
    return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function GET() {
  try {
    await conectDB();
    const voltas = await Volta.find();
    return NextResponse.json(voltas); // ✅ retorno obrigatório
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
    return atualizarVolta(req, res);
}    catch(err){
    console.log(err)
    return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
export async function DELETE(request) {
    try{
    await conectDB();
    const req = await request.json();  
    req.params = { id: req.id };
    const res = {
        status: (status) => ({
            json: (data) => NextResponse.json(data, { status }),
        }),
    };
    return deletarVolta(req, res);
}    catch(err){
    console.log(err)
    return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
