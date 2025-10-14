'use client';
/*
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const { 'cronometro-token': token } = parseCookies();

    if (!token) {
      router.push('/');
    }
  }, []);

  return <>{children}</>;
}*/
"use client";
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

      // Exemplo: somente admin
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
