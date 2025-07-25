import React from "react"; 
import * as icons from "react-bootstrap-icons"

interface iconPros extends icons.IconProps {
    iconName: keyof typeof icons;
}

export const Icon = ({ iconName, ...props }: iconPros) => {
    const IconComponent = icons[iconName];
    return <IconComponent {...props} />;
}
interface ModalCadastroProps {
    isOpen: boolean;   
    Titulo: string;
    setOpenModal: () => void;
    children: React.ReactNode;
}

export default function ModalCadastro({isOpen, Titulo, setOpenModal, children}:ModalCadastroProps) {
    if(isOpen){
        return(
            <div className="ka-modal">
                <div className="ka-modal-header">
                    <h3>{Titulo}</h3>
                    <button type="button" onClick={setOpenModal} className="ka-button-close-modal"><Icon iconName="XCircle" /></button>
                </div>
                <div className="ka-modal-content">
                        {children}
                </div>
                
            </div>
        )
    }
    return null
}