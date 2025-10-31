'use client'

import React, {useState} from "react";
import ModalCadastro from "@/componets/Modal";
import Piloto from "@/componets/cadastro/Piloto";
import Prova from "@/componets/config/prova";


const Cronometrista = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="content">            
                <ModalCadastro isOpen={isOpen} setOpenModal={()=>setIsOpen(!isOpen)} Titulo="Gerenciamento de Prova">
                    <Prova />
                </ModalCadastro>
        </div>
    );
}
export default Cronometrista;