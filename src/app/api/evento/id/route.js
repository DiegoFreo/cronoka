import { NextResponse } from "next/server";
import conectDB from '../../../../lib/mongodb';
import evento from "../../../model/evento";


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