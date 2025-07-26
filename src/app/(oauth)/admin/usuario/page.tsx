'use client';
import React from "react";
import { useForm} from "react-hook-form"; 
import { FaEdit, FaTrash } from "react-icons/fa";
import { Select, SelectItem } from '@/componets/ui/select';
import "@/componets/stylescorrida.css";
import "@/componets/styles.css";

const UsuarioPage = () => {
  const { register, handleSubmit} = useForm();

  const onSubmit = (data:any) => {
    console.log(data);
  }

  function limparCanpos(){        

    }
  return (
      <div className="content bg-footer">
          <div className="contenter-form bg-footer">
              <h1>Cadastro de Usuário</h1>
              <div className="is-flex ">
                  <div className="content-form-form  w-50">
                   <form  className="w-100" onSubmit={handleSubmit(onSubmit)} >
                      <div className="w-100 is-flex fix">
                          <div className="w-100 ">
                              <label htmlFor="nome" >Nome:</label>
                              <input {...register('nome')} className="ka-input w-100" value={""} onChange={()=>{}} type="text" id="nome" placeholder="Nome" name="nome" required />
                          </div>                        
                      </div>
                      <div className="w-100 is-flex fix">
                          <div className="w-100 ">
                              <label htmlFor="numero_piloto">Senha:</label>
                              <input {...register('numero_piloto')} className="ka-input w-100" value={""} onChange={()=>{}} type="text" id="numero_piloto" placeholder="Numero do piloto" name="numero_piloto" required />
                          </div>
                          <div className="w-100 ">
                              <label htmlFor="cpf">Confirmar Senha:</label>
                              <input {...register('confirme')} className="ka-input w-100" value={""} onChange={()=>{}} type="text" id="confirme" placeholder="Confirma Senha" name="confirme" required />
                          </div>
                      </div>
                       <div className="w-100 is-flex fix">
                          <div className="w-100 ">
                              <label htmlFor="email">E-mail:</label>
                              <input {...register('email')} className="ka-input w-100" value={""} onChange={()=>{}} type="text" id="email" placeholder="email" name="email" required />
                          </div>                         
                       </div>
                        <div className="w-100 ">
                              <label htmlFor="nivel">Nivel:</label>
                              <Select className="select-corrida w-100" >
                                  <SelectItem value="">Selecione o Nivel de Usuário</SelectItem>
                                {["A","C", "S"].map((item) => (
                                  <SelectItem key={item} value={item.toString()}>
                                    {`${item}`}
                                    </SelectItem>
                                ))}
                              </Select>
                        </div>
                       
                       <div className="text-center py-4 text-sm text-muted-foreground border-t bg-footer border-border aling-center">
                          <button className="btn-corrida bg-cronometro" type="submit" onClick={handleSubmit(onSubmit)}>Salvar</button>
                          <button className="btn-corrida bg-cronometro" type="reset" onClick={limparCanpos}>Limpar</button>
                      </div>
                   </form>
                   </div>
                  <div className="p-10 w-50">   
                      <div className="scrollbar">                
                      <table border={1} className="ka-table">
                          <thead>
                              <tr><th colSpan={4} className="ka-table-title" >Tabela Piloto</th></tr>
                              <tr>
                                  <th>Nome</th>
                                  <th>Número Piloto</th>
                                  <th colSpan={2}>Editar/Excluir</th>
                                  
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>João Silva</td>
                                  <td>123</td>
                                  <td><FaEdit className="ka-table-icon" /></td>
                                  <td><FaTrash className="ka-table-icon" /></td>
                              </tr>
                              <tr>
                                  <td>Maria Oliveira</td>
                                  <td>456</td>
                                  <td><FaEdit className="ka-table-icon" /></td>
                                  <td><FaTrash className="ka-table-icon" /></td>
                              </tr>                     
                          </tbody>
                      </table>
                      </div>
                  </div>
               </div>   
          </div>
      </div>
      );
}
export default UsuarioPage;