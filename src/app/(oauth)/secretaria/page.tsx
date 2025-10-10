import type { Metadata } from "next";
import {RequireAuth} from "@/componets/RequireAuth";


export default function SecretariaLayout({
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