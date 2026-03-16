import React from "react";
import '@/componets/styles.css';
import { useForm } from "react-hook-form";
import SelectSearchable from "@/componets/ui/SelectSearchable";
import Button from "@/componets/ui/Buttom";
import Modal from "@/componets/Modal";
import BateriaAll from "@/componets/cadastro/bateriaAll";


export default function Bateria() {
    return(
            <BateriaAll />
    )
}