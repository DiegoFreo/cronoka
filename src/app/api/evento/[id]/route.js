import { NextResponse } from "next/server";
import { conectDB } from "../../../../lib/mongodb";
import Evento from "../../../model/evento";

export async function PUT(request, { params }) {
  try {
    await conectDB();

    const { id } = await params; // pega o ID da URL
    const dados = await request.json();

    const Atualizada = await Evento.findByIdAndUpdate(id, dados, { new: true });

    if (!Atualizada) {
      return NextResponse.json({ error: "Evento não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ data: Atualizada }, { status: 200 });

  } catch (err) {
    console.error("Erro ao atualizar evento:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await conectDB();
    const { id } = params;

    const Removida = await Evento.findByIdAndDelete(id);
    if (!Removida) {
      return NextResponse.json({ error: "Evento não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Evento removida com sucesso" }, { status: 200 });
  } catch (err) {
    console.error("Erro ao excluir Evento:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
