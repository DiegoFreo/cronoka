import { NextResponse } from "next/server";
import conectDB from "../../../../lib/mongodb";
import Usuario from "../../../model/usuario";
import { verifyToken } from "../../../../lib/verifyToken";

export async function GET(request) {
  try {
    await conectDB();

    // 🔹 Lê o header Authorization: Bearer <token>
    const authHeader = request.headers.get("authorization");
    console.log("Auth Header:", authHeader);
    if (!authHeader) {
      return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const { valid, decoded, error } = verifyToken(token);

    if (!valid) {
      return NextResponse.json({ error: "Token inválido: " + error }, { status: 401 });
    }

    // 🔹 Busca o usuário no banco com base no id do token
    const usuario = await Usuario.findById(decoded.idUser).select("passwordUser");
    if (!usuario) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ usuario }, { status: 200 });
  } catch (err) {
    console.error("Erro na validação:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
