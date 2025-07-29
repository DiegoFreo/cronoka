'use client';
import React, { useEffect } from "react";
import { set, useForm} from "react-hook-form"; 
import { FaEdit, FaTrash } from "react-icons/fa";
import { Select, SelectItem } from '@/componets/ui/select';
import { useRouter } from "next/navigation";
import "@/componets/stylescorrida.css";
import "@/componets/styles.css";
import Button from "@/componets/ui/Buttom";

interface UsuarioType {
  nameUser: string;
  passworUser: string;
  emailUser: string;
  nivelUser: string;
  avatarUser: Blob | null;
}

const UsuarioPage = () => {
  const { register, handleSubmit} = useForm();
  const [nomeUser, setNomeUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirme, setConfirme] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [nivel, setNivel] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [user, setUser] = React.useState<UsuarioType[]>([]);
  const router = useRouter();

  useEffect(() => {
    buscatUser();
  }, []);

  async function buscatUser() {
        // Aqui você pode fazer uma chamada à API para buscar os dados do piloto
        // Exemplo de chamada fictícia: 
        // const response = await api.get('/pilotos');
        try {
            const response = await fetch("http://localhost:3030/user");
            if (!response.ok) {
                throw new Error('Erro ao buscar pilotos');
            }
            const data = await response.json();
            setUser(data);
           
        } catch (erro: any) {
            console.error("Erro ao buscar pilotos:", erro);
            alert("Erro ao buscar pilotos: " + erro.message);
        }
    }
  
  const handlImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file instanceof Blob) {
      setAvatar(URL.createObjectURL(file as Blob) );
    } else {
      setAvatar('');
    }
  }

  const onSubmit = (data:any) => {
    
      const{ nome, senha, confirme, email, nivel, avatar } = data;
      if (senha !== confirme) {
        alert("As senhas não conferem!");
        return;
      }
      const userData: UsuarioType = {
        nameUser: nome,
        passworUser: senha,
        emailUser: email,
        nivelUser: nivel,
        avatarUser: avatar ? new Blob([avatar], { type: 'image/jpeg' }) : null,
      };
      console.log("Dados do usuário:", userData);
      // Aqui você pode fazer uma chamada à API para salvar os dados do usuário
      try{
      const response = fetch("http://localhost:3030/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Erro ao salvar usuário');
        }
        return res.json();
      }).then((data) => {
        alert("Usuário salvo com sucesso!");        
        buscatUser(); // Atualiza a lista de usuários após salvar
        limparCampos(); // Limpa os campos do formulário
      });
    } catch (error: any) {
        alert("Erro ao salvar usuário: " + error.message);
    }
  }

  function limparCampos(){    
    setNomeUser("");
    setPassword("");  
    setConfirme("");
    setEmail("");
    setNivel("");
    setAvatar("");
  }
  return (
      <div className="content bg-footer">
          <div className="contenter-form ">
            <div className="flex justify-between items-center p-4 bg-header contenter-form-h1">
              <h1>Cadastro de Usuário</h1>
              <Button className="bg-cronometro btn-corrida w-10" onClick={()=>{router.push('/')}}>X</Button>              
            </div>
              
              <div className="is-flex ">
                  <div className="content-form-form  w-50">
                   <form  className="w-100" onSubmit={handleSubmit(onSubmit)} >
                        <div className="w-100 is-flex fix">
                              <div className="w-100 flex flex-row align-center items-center justify-between">
                                <label htmlFor="avatar" className="avatar-title">Clique a qui para selecionar uma imagem</label>
                                <input {...register('avatar')}  className="ka-input hidden w-50" type="file" id="avatar" name="avatar" onChange={handlImageChange} />
                              <div className="avatar-preview">
                                    {avatar && <img src={avatar} alt="Avatar Preview" className="avatar-image" />}
                              </div>
                            </div>
                        </div>
                      <div className="w-100 is-flex fix">
                          <div className="w-100 ">
                              <label htmlFor="nome" >Nome:</label>
                              <input {...register('nome')} className="ka-input w-100" type="text" id="nome" placeholder="Nome" name="nome" required />
                          </div>                        
                      </div>
                      <div className="w-100 is-flex fix">
                          <div className="w-100 ">
                              <label htmlFor="senha">Senha:</label>
                              <input {...register('senha')} className="ka-input w-100"  type="password" id="senha" placeholder="Senha" name="senha" required />
                          </div>
                          <div className="w-100 ">
                              <label htmlFor="cpf">Confirmar Senha:</label>
                              <input {...register('confirme')}  className="ka-input w-100"  type="password" id="confirme" placeholder="Confirma Senha" name="confirme" required />
                          </div>
                      </div>
                       <div className="w-100 is-flex fix">
                          <div className="w-100 ">
                              <label htmlFor="email">E-mail:</label>
                              <input {...register('email')} className="ka-input w-100"  type="text" id="email" placeholder="email" name="email" required />
                          </div>                         
                       </div>
                       
                        <div className="w-100 ">
                              <label htmlFor="nivel">Nivel:</label>
                              <Select className="select-corrida w-100"  {...register('nivel')}  name="nivel" >
                                  <SelectItem value="" >Selecione o Nivel de Usuário</SelectItem>
                                {["A","C", "S"].map((item) => (                                  
                                  <SelectItem key={item} value={item} >                                    
                                    {item }
                                  </SelectItem>
                                ))}
                              </Select>
                        </div>
                       
                       <div className="text-center py-4 text-sm text-muted-foreground border-t bg-footer border-border aling-center">
                          <button className="btn-corrida bg-cronometro" type="submit" onClick={handleSubmit(onSubmit)}>Salvar</button>
                          <button className="btn-corrida bg-cronometro" type="reset" onClick={limparCampos}>Limpar</button>
                      </div>
                   </form>
                   </div>
                  <div className="p-10 w-50">   
                      <div className="scrollbar">                
                      <table border={1} className="ka-table">
                          <thead>
                              <tr><th colSpan={5} className="ka-table-title" >Tabela Piloto</th></tr>
                              <tr>
                                  <th>Nome</th>
                                  <th>Email</th>
                                  <th>Nível</th>
                                  <th>Editar</th>
                                  <th>Excluir</th>
                                  
                              </tr>
                          </thead>
                          <tbody>
                            {user.map((item, index) => (
                              <tr key={index}>
                                  <td>{item.nameUser}</td>
                                  <td>{item.emailUser}</td>
                                  <td>{item.nivelUser}</td>
                                  <td><button className="btn-corrida bg-cronometro" onClick={()=>{}}  ><FaEdit /></button></td>
                                  <td><button className="btn-corrida-reset" onClick={()=>{}} ><FaTrash /></button></td>
                              </tr>
                            ))}
                                                 
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