import { NextResponse } from "next/server";
import { conectDB } from "../../../../lib/mongodb";
import Bateria from "../../../model/bateria";

export async function PUT(request, { params }) {
  try {
    await conectDB();

    const { id } = await params; // pega o ID da URL
    const dados = await request.json();

    const Atualizada = await Bateria.findByIdAndUpdate(id, dados, { new: true });

    if (!Atualizada) {
      return NextResponse.json({ error: "Bateria não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ data: Atualizada }, { status: 200 });

  } catch (err) {
    console.error("Erro ao atualizar bateria:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    await conectDB();
    const { id } = params;
    const bateria = await Bateria.findById(id).populate('pilotos');
    if (!bateria) {
      return NextResponse.json({ error: "Bateria não encontrada" }, { status: 404 });
    }
    return NextResponse.json({ data: bateria }, { status: 200 });
  } catch (err) {
    console.error("Erro ao buscar bateria:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await conectDB();
    const { id } = params;

    const Removida = await Bateria.findByIdAndDelete(id);
    if (!Removida) {
      return NextResponse.json({ error: "Bateria não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Bateria removida com sucesso" }, { status: 200 });
  } catch (err) {
    console.error("Erro ao excluir bateria:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
