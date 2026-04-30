import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import  conectDB from "../../../../lib/mongodb"
import Usuario from "../../../model/usuario";

export async function POST(request) {
  try {
    await  conectDB();
    const { emailUser, passworUser } = await request.json();

    const usuario = await Usuario.findOne({ emailUser, passworUser });
    if (!usuario) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET não configurado");

    const token = jwt.sign(
      {
        idUser: usuario._id.toString(),
        nivelUser: usuario.nivelUser,
        nameUser: usuario.nameUser,
        emailUser: usuario.emailUser,
        avatarUser: usuario.avatarUser,
      },
      jwtSecret,
      { expiresIn: "6h" }
    );
    Cookies.set("cronometro-token", token, { expires: 0.25, path: '/' }); // 6 horas
    /*
    return NextResponse.json({
      success: true,
      data: {
        token,
        usuario: {
          _id: usuario._id,
          nameUser: usuario.nameUser,
          emailUser: usuario.emailUser,
          nivelUser: usuario.nivelUser,
        },
      },
    });*/

    const response = NextResponse.json({
      success: true,
      data: {
        usuario: {
          _id: usuario._id,
          nameUser: usuario.nameUser,
          emailUser: usuario.emailUser,
          nivelUser: usuario.nivelUser,
        },
        token,
      },
    });

    /*
    response.cookies.set("cronometro-token", token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 6 * 60 * 60, // 6 horas em segundos
    });*/

    return response;


  } catch (err) {
    console.error("Erro no login:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
