'use client';
import React, {useEffect, useState } from 'react';
import { createContext } from "react";
import {setCookie, parseCookies, destroyCookie}from 'nookies'
import { useRouter } from 'next/navigation';

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
    idUser: number,
    nameUser: string,
    emailUser: string,
    nivelUser: string,
    avatarUser: Blob | null,
    // Adicione outros campos conforme necessário
}
export const AuthContext = createContext({} as AuthContextType);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  
  const [users, setUser] = useState<UserType | null>(null);
  const isAuthenticated = !!users; // Verifica se o usuário está autenticado
  const router = useRouter();

  useEffect(() => {
      const {'cronometro-token': token} = parseCookies();
      console.log("Usuario: "+token);

      if (!token ) {
        router.push('/'); // Redireciona para a página de login se não houver token
      }
  }, []);


  async function signIn({emailUser, passworUser}: SignInCredentials) {
    try {
    // Aqui você implementaria a lógica de autenticação, como uma chamada à API
    // Por exemplo:
    const {token, user}= await fetch( "http://localhost:3030/login", {
      method: 'POST',
      body: JSON.stringify({emailUser, passworUser}),
      headers: {'Content-Type': 'application/json'} ,   
    }).then((response) => {
      if (!response.ok) {
        alert('Erro ao fazer login, verifique os dados informados');
        throw new Error('Erro ao fazer login');
      }
      return response.json();
      
    });
    setCookie(null, 'cronometro-token', token, {
      maxAge: 60 * 60 * 6, // 1h
      path: './',      
    });
    
    setUser(user);  
    console.log('Usuário autenticado:', user);
    
      // Redireciona para a página de dashboard ou outra página após o login
      if(user?.nivelUser === 'A')  {
          router.push('/admin'); // Redireciona para a página de admin
        }else if(user?.nivelUser === 'C') {
        router.push ('/cronometrista');   
        }else if(user?.nivelUser === 'S') {
          router.push('/secretaria'); 
        }else{
          alert('Nível de usuário não reconhecido'+ user?.nivelUser);
          return;
        } 
    }
    catch(error) {
      alert('Erro ao redirecionar após o login');
      console.error('Erro ao redirecionar após o login:', error);
      // Aqui você pode lidar com o erro de redirecionamento, se necessário
    }
  }
  
 function logout() {
    destroyCookie(null, 'cronometro-token', { path: './' });
    setUser(null);
    router.push('/'); // Redireciona para a página de login após o logout
  }
       
  return (
    <AuthContext.Provider value={{users, isAuthenticated, signIn, logout}}>
      {children}
    </AuthContext.Provider>
  );
}