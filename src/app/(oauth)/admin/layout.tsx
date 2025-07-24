import type { Metadata } from "next";
import DropDownMenu from "@/componets/Menu";
import {  FaEdit, FaHome} from "react-icons/fa";
import {RequireAuth} from "@/componets/RequireAuth";
import "../../globals.css";
import "../../../componets/stylescorrida.css";
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
