import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Token não fornecido" }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, jwtSecret);

    return NextResponse.json({
      usuario: {
        _id: decoded.idUser,
        nameUser: decoded.nameUser,
        emailUser: decoded.emailUser,
        nivelUser: decoded.nivelUser,
      },
    });
  } catch (err) {
    console.error("Erro ao validar token:", err.message);
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
