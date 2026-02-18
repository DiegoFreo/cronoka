import {RequireAuth} from "@/componets/RequireAuth";
//import "@/app/globals.css";
import "@/componets/stylescorrida.css";
import '@/componets/dashboard.css';

export default function CronometristaLayout({
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