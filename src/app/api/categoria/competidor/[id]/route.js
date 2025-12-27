import { NextResponse } from "next/server";
import { conectDB } from "../../../../../lib/mongodb";
import Categoria from "@/app/model/categoria";

export async function PUT(request, { params }) {
  try {
    await conectDB();

    const { id } = await params; // pega o ID da URL
    const dados = await request.json();

    const categoriaAtualizada = await Categoria.findByIdAndUpdate(id, dados, { new: true });

    if (!categoriaAtualizada) {
      return NextResponse.json({ error: "Categoria não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ data: categoriaAtualizada }, { status: 200 });

  } catch (err) {
    console.error("Erro ao atualizar categoria:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    await conectDB();
    const { id } = params;
    const categoria = await Categoria.findById(id).populate('pilotos');
    if (!categoria) {
      return NextResponse.json({ error: "Categoria não encontrada" }, { status: 404 });
    }
    return NextResponse.json({ data: categoria }, { status: 200 });
  } catch (err) {
    console.error("Erro ao buscar bateria:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await conectDB();
    const { id } = params;

    const categoriaRemovida = await Categoria.findByIdAndDelete(id);
    if (!categoriaRemovida) {
      return NextResponse.json({ error: "Categoria não encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Categoria removida com sucesso" }, { status: 200 });
  } catch (err) {
    console.error("Erro ao excluir categoria:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
