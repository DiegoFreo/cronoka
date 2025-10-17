'use client';
import React, { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  users: UserType | null;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  logout: () => void;
}

interface SignInCredentials {
  emailUser: string;
  passworUser: string;
}

interface UserType {
  _id: string;
  nameUser: string;
  emailUser: string;
  nivelUser: string;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUser] = useState<UserType | null>(null);
  const router = useRouter();
  const isAuthenticated = !!users;

  useEffect(() => {
    const { "cronometro-token": token } = parseCookies();

    if (!token) return;

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.usuario) {
          setUser(data.usuario);
        } else {
          console.warn("⚠️ Nível de usuário desconhecido, redirecionando para /");
          destroyCookie(null, "cronometro-token");
        }
      })
      .catch(() => destroyCookie(null, "cronometro-token"));
  }, []);

  async function signIn({ emailUser, passworUser }: SignInCredentials) {
    try {
      const res = await fetch("/api/usuario/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailUser, passworUser }),
      }).then((response) => response);

      const data = await res.json();
      
      if (!res.ok || !data?.data.token ) throw new Error(data.error || "Erro ao fazer login 1");

     
      
      const {token, usuario } = data.data;
     
       console.log("Resposta do login:",  token, usuario);

      setCookie(null, "cronometro-token", token, {
        maxAge: 60 * 60 * 6, // 6 hours
      });
     
      setUser(usuario);
     
      if (usuario.nivelUser === "A") router.push("/admin");
      else if (usuario.nivelUser === "C") router.push("/cronometrista");
      else if (usuario.nivelUser === "S") router.push("/secretaria");
      else router.push("/");


      
/*
     setTimeout(() => {
        if (usuario.nivelUser === "A") {
          console.log("🔵 Redirecionando para /admin");
          router.replace("/admin");
        } else if (usuario.nivelUser === "C") {
          console.log("🟡 Redirecionando para /cronometrista");
          router.replace("/cronometrista");
        } else if (usuario.nivelUser === "S") {
          console.log("🟢 Redirecionando para /secretaria");
          router.replace("/secretaria");
        } else {
          console.warn("⚠️ Nível de usuário desconhecido");
          router.replace("/");
        }
      }, 300);
      */
    } catch (err) {
      alert("Erro ao fazer login");
      console.error("Erro no login:", err);
    }
  }


  function logout() {
    destroyCookie(null, "cronometro-token", { path: "/" });
    setUser(null);
    router.push("/");
  }

  return (
    <AuthContext.Provider value={{ users, isAuthenticated, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}