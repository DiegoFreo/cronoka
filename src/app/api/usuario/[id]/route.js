import { NextResponse } from "next/server";
import { conectDB } from "../../../../lib/mongodb";
import Usuario from "../../../model/usuario";

export async function PUT(request, { params }) {
  try {
    await conectDB();

    const { id } = await params; // pega o ID da URL
    const dados = await request.json();

    const Atualizada = await Usuario.findByIdAndUpdate(id, dados, { new: true });

    if (!Atualizada) {
      return NextResponse.json({ error: "Usuario não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ data: Atualizada }, { status: 200 });

  } catch (err) {
    console.error("Erro ao atualizar Usuario:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await conectDB();
    const { id } = params;

    const Removida = await Usuario.findByIdAndDelete(id);
    if (!Removida) {
      return NextResponse.json({ error: "Usuario não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Usuario removida com sucesso" }, { status: 200 });
  } catch (err) {
    console.error("Erro ao excluir usuario:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
