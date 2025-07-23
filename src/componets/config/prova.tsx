import React from "react";
import Button from "../ui/Buttom";


const GerenciamentoProva=()=>{
    return(
        <div className="gerenciamento">        
            <div className="content-gerenciamento">
                <div className="gerenciamento-top">
                    <div className="gerenciamento-box">
                        <p>Próximos eventos</p>
                        <p>(0)</p>
                    </div>
                    <div className="gerenciamento-box">
                       <p>Evetos próximos</p> 
                       <p>(0)</p>
                    </div>
                    <div className="gerenciamento-box">
                        <p>Eventos Finalizados</p>
                        <p>(0)</p>
                    </div>
                </div>
            </div>
            <div className="gerencimanto-box-div">
            <div className="gerenciamento-left">

            </div>
            <div className="gerenciamento-rigth">
                <div className="gerenciamnto-box-bottom">
                    <h5>NOVO EVENTO</h5>
                    <p>cria um novo evento</p>
                    <Button text="Novo evento" className="gerenciamento-buttom" />
                </div>
            </div>
            </div>
        </div>
    )
}

export default GerenciamentoProva;