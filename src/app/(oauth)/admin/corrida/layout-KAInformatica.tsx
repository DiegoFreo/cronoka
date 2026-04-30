import type { Metadata } from "next";
import {RequireAuth} from "@/componets/RequireAuth";
import "@/app/globals.css";
import "@/componets/stylescorrida.css";

export default function CorridaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RequireAuth>  
            {children}
    </RequireAuth>
  );
}
