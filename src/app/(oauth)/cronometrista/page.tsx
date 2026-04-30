'use client'

import React, {useState} from "react";
import ModalCadastro from "@/componets/Modal";
<<<<<<< HEAD
import Piloto from "@/componets/cadastro/Piloto_2";
import GerenciamentoProva from "@/componets/config/prova";
=======
import Piloto from "@/componets/cadastro/Piloto";
import Prova from "@/componets/config/prova";
>>>>>>> ee9061d718d7003358dff4b156bbd5e7f07b5640


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