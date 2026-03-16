"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("cronometro-token");
    //const {'cronometro-token': token } = parseCookies();

    if (!token) {
      console.warn("🚫 Nenhum token encontrado, redirecionando para login...");
      router.push("/");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);

      if (!decoded?.nivelUser) {
        console.warn("⚠️ Token sem nível de usuário, voltando ao login.");
        router.push("/");
        return;
      }

      console.log(`🧩 Usuário autenticado: nível ${decoded.nivelUser}`);

      // Aguarda um ciclo do event loop antes de redirecionar
     setTimeout(() => {
        if (decoded.nivelUser === "A" && !window.location.pathname.startsWith("/admin")) {
          console.log("🔵 Redirecionando para /admin");
          router.push("/admin");
        } else if (decoded.nivelUser === "S" && !window.location.pathname.startsWith("/secretaria")) {
          console.log("🟢 Redirecionando para /secretaria");
          router.push("/secretaria");
        } else if (decoded.nivelUser === "C" && !window.location.pathname.startsWith("/cronometrista")) {
          console.log("🟠 Redirecionando para /cronometrista");
          router.push("/cronometrista");
        }
      }, 100); // <-- pequeno delay garante que o roteador esteja pronto
    } catch (error) {
      console.error("❌ Erro ao decodificar token:", error);
      router.push("/");
    }
  }, [router]);

  return <>{children}</>;
}




/*
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

interface RequireAuthProps {
  children: React.ReactNode;
  nivel?: "A" | "S" | "C";
}

export function RequireAuth({ children, nivel }: RequireAuthProps) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("cronometro-token");
    if (!token) {
      console.warn("🚫 Nenhum token encontrado — redirecionando para login");
      router.replace("/");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      console.log("🧩 Token decodificado:", decoded);

      if (nivel && decoded.nivelUser !== nivel) {
        console.warn(`🚫 Acesso negado — nível necessário: ${nivel}`);
        router.replace("/");
        return;
      }

      setAuthorized(true);
    } catch (err) {
      console.error("❌ Erro ao decodificar token:", err);
      router.replace("/");
    }
  }, [nivel, router]);

  if (!authorized) return <p>Verificando acesso...</p>;

  return <>{children}</>;
}
*/




/*"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("cronometro-token");
    if (!token) {
      router.replace("/");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);

      if (decoded.nivelUser !== "A") {
        router.replace("/");
        return;
      }

      setAuthorized(true);
    } catch (err) {
      router.replace("/");
    }
  }, [router]);

  if (!authorized) return <p>Carregando...</p>;

  return <>{children}</>;
}
*/