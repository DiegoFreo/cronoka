import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import conectDb from "@/lib/mongodb";
import Usuario from "../../../model/usuario"

export async function POST(request) {
  try {
    await conectDb();
    const { emailUser, passworUser } = await request.json();

    const usuario = await Usuario.findOne({ emailUser, passworUser });

    if (!usuario) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET não configurado");

    const token = jwt.sign(
      {
        idUser: usuario._id,
        nivelUser: usuario.nivelUser,
        nameUser: usuario.nameUser,
      },
      jwtSecret,
      { expiresIn: "6h" }
    );

    return NextResponse.json(
      {
        data: {
          token,
          usuario: {
            _id: usuario._id,
            nameUser: usuario.nameUser,
            emailUser: usuario.emailUser,
            nivelUser: usuario.nivelUser,
          },
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Erro no login:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}