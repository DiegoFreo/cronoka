'use client'

import React, {useState} from "react";
import ModalCadastro from "@/componets/Modal";
import Piloto from "@/componets/cadastro/Piloto";
import GerenciamentoProva from "@/componets/config/prova";


const SecretariaPage= () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="content">            
                <ModalCadastro isOpen={isOpen} setOpenModal={()=>setIsOpen(!isOpen)} Titulo="Gerenciamento de Prova">
                    <GerenciamentoProva />
                </ModalCadastro>
        </div>
    );
}
export default SecretariaPage;