import { NextResponse } from "next/server";
import conectDB from '../../../lib/mongodb';
<<<<<<< HEAD
import evento from "../../model/evento-KAInformatica";
=======
import evento from "../../model/evento";
>>>>>>> ee9061d718d7003358dff4b156bbd5e7f07b5640
import { criarEvento, listarEventos, atualizarEvento, deletarEvento } from  '../../controller/eventoController';

export async function POST(request) {
    try{
    await conectDB();
    const dados = await request.json();
    const result = await criarEvento(dados);
    return NextResponse.json(result.data || { error: result.error }, { status: result.status });
}    catch(err){
    console.log(err)
    return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
export async function GET() {
  try {
    await conectDB();
<<<<<<< HEAD
    const eventos = await evento.find();
=======
    const eventos = await listarEventos();
>>>>>>> ee9061d718d7003358dff4b156bbd5e7f07b5640
    return NextResponse.json(eventos); // ✅ retorno obrigatório
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 }); // ✅ retorno no erro também
  }
}

export async function PUT(request, { params }) {
  try {
    await conectDB();

    console.log(params);

    const data = await request.json(); // corpo enviado no PUT
    const result = await atualizarEvento(params._id, data);

    return NextResponse.json(result.data, { status: result.status });
  } catch (err) {
    console.error("Erro na rota PUT:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}