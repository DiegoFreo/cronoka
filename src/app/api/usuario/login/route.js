import { NextResponse } from "next/server";
import conectDB from '../../../../lib/mongodb';
import {loginUsuario } from  '../../../controller/usuarioController';

export async function POST(request) {
    try{
    
    //await conectDB();
    const dados = await request.json();
    const result = await loginUsuario(dados);

    if(result.error){
        return NextResponse.json({ error: result.error }, { status: result.status });
    }
    
    return NextResponse.json(result, { status: result.status });
    
    }catch(err){

        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}