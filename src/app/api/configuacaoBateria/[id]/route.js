import { NextResponse } from "next/server";
import conectDB from '../../../lib/mongodb';
import ConfiguracaoBateria from "../../model/configuracoa_bateria";
import {listarConfiguracoesBateria, atualizarConfiguracaoBateria, deletarConfiguracaoBateria } from  '../../controller/configuracaoBateria.js';  

export async function GET() {
  try {
    await conectDB();
    const configuracoes = await listarConfiguracoesBateria();
    return NextResponse.json(configuracoes); // ✅ retorno obrigatório
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 }); // ✅ retorno no erro também
  }
}
export async function PUT(request, { params }) {
  try {
    await conectDB();
    console.log(params);
    const data = await request.json(); // corpo enviado no PUT
    const result = await atualizarConfiguracaoBateria(params.id, data);
    return NextResponse.json(result.data, { status: result.status });
  } catch (err) {
    console.error("Erro na rota PUT:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
    try {
        await conectDB();
        const result = await deletarConfiguracaoBateria(params.id);
        return NextResponse.json(result.data, { status: result.status });
    } catch (err) {
        console.error("Erro na rota DELETE:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

