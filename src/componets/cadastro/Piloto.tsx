import React from "react";
import Button from "../ui/Buttom";

const Piloto = () => {
    return (
        <div>
            <form >
                <div className="w-100 is-flex fix">
                    <div className="w-50 ">
                        <label htmlFor="nome" >Nome:</label>
                        <input className="ka-input w-100" type="text" id="nome" placeholder="Nome" name="nome" required />
                    </div>
                    <div className="w-50 ">
                        <label htmlFor="npiloto">Número Piloto:</label>
                        <input className="ka-input w-100" type="text" id="npiloto" placeholder="Numero do piloto" name="npiloto" required />
                    </div>
                    <div className="w-50 ">
                        <label htmlFor="cpf">CPF:</label>
                        <input className="ka-input w-100" type="text" id="cpf" placeholder="CPF" name="cpf" required />
                    </div>
                </div>
                <div className="w-100 is-flex fix">
                    <div className="w-50 ">
                        <label htmlFor="filiacao" >Filiação:</label>
                        <input className="ka-input w-100" type="text" id="filiacao" placeholder="Filiação" name="filiacao" required />
                    </div>
                    <div className="w-50 ">
                        <label htmlFor="telefone" >Fone:</label>
                        <input className="ka-input w-100" type="text" id="telefone" placeholder="Fone" name="telefone" required />
                    </div>
                    <div className="w-50 ">
                        <label htmlFor="equip" >Equipe:</label>
                        <input className="ka-input w-100" type="text" id="equipe" placeholder="Equipe" name="equipe" required />
                    </div>
                </div>
                <div className="w-100 is-flex fix">
                    <div className="w-50 ">
                        <label htmlFor="tag1" >Tag 1:</label>
                        <input className="ka-input w-100" type="text" id="tag1" placeholder="Tag 1" name="tag1" required />
                    </div>
                    <div className="w-50 ">
                        <label htmlFor="tag2" >Tag 2:</label>
                        <input className="ka-input w-100" type="text" id="tag2" placeholder="Tag 2" name="tag2" required />
                    </div>
                    <div className="w-50 ">
                        <label htmlFor="tag3" >Tag 3:</label>
                        <input className="ka-input w-100" type="text" id="tag3" placeholder="Tag 3" name="tag3" required />
                    </div>
                    <div className="w-50 ">
                        <label htmlFor="tag4" >Tag 4:</label>
                        <input className="ka-input w-100" type="text" id="tag4" placeholder="Tag 3" name="tag4" required />
                    </div>
                </div>
                <div className=" ka-modal-footer">
                    <Button className="btn btn-green" onClick={()=>{}}>Salvar</Button>
                    <Button className="btn btn-corrida-reset " onClick={()=>{}}>Cancelar</Button>                       
                 
                </div>
            </form>           
        </div>
    );
}
export default Piloto;