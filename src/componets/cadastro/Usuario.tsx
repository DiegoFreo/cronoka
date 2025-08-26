import React,{useEffect, useState} from "react";
import Button from "../ui/Buttom";
import { useForm } from "react-hook-form";
import { FaTrash, FaEdit } from "react-icons/fa";

interface UsuarioProps {
  idUser: number;
  nameUser: string;
  emailUser: string;
  nivelUser: string;
  avatarUser?: Blob;
}

const Usuario = () => {
  const { register, handleSubmit, reset } = useForm();
  const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    // Função para buscar usuários
    const fetchUsuarios = async () => {
        try {
            const response = await fetch("http://localhost:3030/user");
            if (!response.ok) {
                throw new Error('Erro ao buscar usuários');
            }
            const data = await response.json();
            setUsuarios(data);
        } catch (error:any) {
            console.error("Erro ao buscar usuários:", error);
            alert("Erro ao buscar usuários: " + error.message);
        }
    };
    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Aqui você pode fazer algo com a imagem, como exibi-la ou enviá-la para o servidor
                setSelectedImage(file);
                // Se você quiser enviar a imagem para o servidor, pode fazer isso aqui
            };
            reader.readAsDataURL(file);
        }
    }

    // Função para lidar com o envio do formulário
    const onSubmit = async (data: any) => {
        // Verifica se as senhas coincidem
        if (data.passworUser !== data.confirmarSenha) {   
            alert("As senhas não coincidem.");
            return;
        }
        // Remove a propriedade de confirmação de senha antes de enviar
        delete data.confirmarSenha

        try {
            const response = await fetch("http://localhost:3030/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Erro ao cadastrar usuário');
            }
            reset(); // Limpa o formulário após o envio
            setSelectedImage(null); // Limpa a imagem selecionada
            fetchUsuarios(); // Atualiza a lista de usuários
        } catch (error:any) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao cadastrar usuário: " + error.message);
        }
    };


  return (
    <div className="is-flex">
        <div className="content-form-form w-50">
            {/* Formulário de cadastro de usuário */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-100 flex is-flex-wrap-wrap">
                    <div className="w-50">
                        <label htmlFor="nameUser">Nome do Usuário:</label>
                        <input {...register('nameUser')} type="text" className="ka-input w-100" id="nameUser" name="nameUser" required />
                    </div>
                    <div className="w-50">
                        <label htmlFor="emailUser">Email:</label>  
                        <input {...register('emailUser')} type="emailUser" className="ka-input w-100" id="emailUser" name="emailUser" required />
                    </div>
                </div>
                <div className="w-100">                   
                        <label htmlFor="nivelUser">Nível de Acesso:</label>
                        <select {...register('nivelUser')} className="ka-input w-100" id="nivelUser" name="nivelUser" required>
                            <option value="">Selecione</option>
                            <option value="A">Administrador</option>
                            <option value="S">Secretaria</option>
                            <option value="C">Cronometrista</option>
                        </select>
                </div>
                <div className="w-100 flex is-flex-wrap-wrap">
                    <div className="w-50">
                        <label htmlFor="passworUser">Senha:</label>
                        <input {...register('passworUser')} type="password" className="ka-input w-100" id="passworUser" name="passworUser" required />
                    </div>
                    <div className="w-50">
                        <label htmlFor="confirmarSenha">Confirmar Senha:</label>
                        <input {...register('confirmarSenha')} type="password" className="ka-input w-100" id="confirmarSenha" name="confirmarSenha" required />
                    </div>
                </div>
                <div className="w-100 flex is-flex-wrap-wrap">
                    <label htmlFor="avatarUser">
                        {selectedImage ? (
                            <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="img_avatar" />
                        ) : (
                            <span className="ka-avatar-placeholder">Selecione uma imagem</span>
                        )}
                        <input {...register('avatarUser')} type="file" className="ka-input w-100 input_oculta" id="avatarUser" onChange={handleChangeImage} name="avatarUser" accept="image/*" />
                    </label>
                </div>
                
                <div className=" ka-modal-footer">
                <Button className="btn btn-green" onClick={handleSubmit(onSubmit)}>Salvar</Button>
                <Button className="btn btn-corrida-reset" onClick={reset}>Limpar</Button>
                </div>
            </form>
        </div>
        <div className="p-10 w-50">   
             <div className="scrollbar">                
                <table border={1} className="ka-table">
                    <thead>
                        <tr><th colSpan={4} className="ka-table-title" >Tabela Piloto</th></tr>
                            <tr>
                              <th>ID</th>
                              <th>Nome</th>
                              <th>Editar</th>
                              <th>Excluir</th>
                            </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, index) => (
                            <tr key={index}>
                                <td>{usuario.idUser}</td>
                                <td>{usuario.nameUser}</td>
                                <td><Button className="btn btn-edit"><FaEdit /></Button></td>
                                <td><Button className="btn btn-delete"><FaTrash /> </Button></td>
                            </tr>
                        ))}       
                    </tbody>    
                </table>
               </div>
           </div>
           
    </div>
  );
}
export default Usuario;
