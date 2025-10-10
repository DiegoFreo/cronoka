import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/verifyToken";

const protectedRoutes = ["/admin", "/secretaria", "/cronometrista"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ⚙️ Se a rota não estiver protegida, segue normalmente
  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 🧠 Recupera o token salvo no cookie
  const token = req.cookies.get("cronometro-token")?.value;

  if (!token) {
    console.warn("🚫 Nenhum token encontrado, redirecionando para login...");
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // 🧩 Verifica o token
  const { valid, decoded, error } = verifyToken(token);

  if (!valid) {
    console.error("❌ Token inválido:", error);
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // 🧾 Loga as informações do token
 

  const nivel = decoded?.nivelUser;

  // 🔒 Validação de acesso por nível
  if (pathname.startsWith("/admin") && nivel !== "A") {
    console.warn("🚫 Acesso negado: usuário não é administrador");
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/secretaria") && nivel !== "S") {
    console.warn("🚫 Acesso negado: usuário não é da secretaria");
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/cronometrista") && nivel !== "C") {
    console.warn("🚫 Acesso negado: usuário não é cronometrista");
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // ✅ Tudo certo, deixa passar
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/secretaria/:path*", "/cronometrista/:path*"],
};
