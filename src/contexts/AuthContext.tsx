'use client';
import React, { useEffect, useState, createContext } from "react";
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
  avatarUser?: string | null;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUser] = useState<UserType | null>(null);
  const isAuthenticated = !!users;
  const router = useRouter();

  // ✅ Verifica o token ao carregar a aplicação
  useEffect(() => {
    const { "cronometro-token": token } = parseCookies();

    async function validarToken() {
      if (!token) {
        router.push("/");
        return;
      }

      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.usuario);
          console.log("Usuário validado:", data.usuario);
        } else {
          console.warn("Token inválido, redirecionando...");
          destroyCookie(null, "cronometro-token", { path: "/" });
          router.push("/");
        }
      } catch (err) {
        console.error("Erro ao validar token:", err);
        router.push("/");
      }
    }

    validarToken();
  }, [router]);

  // ✅ Login
  async function signIn({ emailUser, passworUser }: SignInCredentials) {
    try {
      const response = await fetch("/api/usuario/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailUser, passworUser }),
      });

      if (!response.ok) {
        alert("Erro ao fazer login. Verifique os dados informados.");
        throw new Error("Erro ao fazer login");
      }

      // Agora o backend retorna { token, usuario } (sem data.data)
      const { token, usuario } = await response.json();

      console.log("Login bem-sucedido:", usuario);
      console.log("Token recebido:", token);

      // ✅ Salva o token no cookie
      setCookie(null, "cronometro-token", token, {
        maxAge: 60 * 60 * 6, // 6 horas
        path: "/",
      });

      // ✅ Atualiza o usuário localmente
      setUser(usuario);

      // ✅ Redireciona conforme o nível
      if (usuario.nivelUser === "A") {
        console.log("🔹 Redirecionando para /admin");
        router.push("/admin");
      } else if (usuario.nivelUser === "C") {
        console.log("🔹 Redirecionando para /cronometrista");
        router.push("/cronometrista");
      } else if (usuario.nivelUser === "S") {
        console.log("🔹 Redirecionando para /secretaria");
        router.push("/secretaria");
      } else {
        alert("Nível de usuário não reconhecido.");
      }
    } catch (error) {
      alert("Erro ao redirecionar após o login");
      console.error("Erro ao redirecionar após o login:", error);
    }
  }

  // ✅ Logout
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
