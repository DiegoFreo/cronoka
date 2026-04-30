import type { Metadata } from "next";
import React  from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
<<<<<<< HEAD
//import './globals.css';
=======
import "./globals.css";
import "@/componets/stylescorrida.css";
import '@/componets/dashboard.css';

>>>>>>> ee9061d718d7003358dff4b156bbd5e7f07b5640
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crono-KA",
  description: "Gerenciamento de Corridas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (   
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-50 text-gray-900 antialiased">
          <AuthProvider>
            {children}
          </AuthProvider> 
      </body>
    </html>
    
  );
}
