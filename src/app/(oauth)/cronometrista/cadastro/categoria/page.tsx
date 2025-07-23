'use client';
import React from 'react';
import { useForm } from 'react-hook-form';

const Categoria = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
        try {
            const response = await fetch("http://localhost:3030/categoria", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar categoria');
            }

            alert("Categoria cadastrada com sucesso!");
        } catch (error: any) {
            console.error("Erro ao cadastrar categoria:", error);
            alert("Erro ao cadastrar categoria: " + error.message);
        }
    };

    return (
        <div className="contenter-form">
            <h1>Cadastro de Categoria</h1>
             <div className="is-flex">
                <div className="content-form-form w-50">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>Nome da Categoria:</label>
                            <input type="text" {...register("nome_categoria")} required className='ka-input w-100' />
                        </div>
                         <div>
                            <label>Descrição da Categoria:</label>
                            <input type="text" {...register("nome_categoria")} required className='ka-input w-100' />
                        </div>
                        <button className='component-button-black' type="submit">Cadastrar</button>
                        <button className="component-button-black" type="reset">Limpar</button>
                    </form>

                </div>
                <div className="p-10 w-50">
                   <table border={1} className="ka-table">
                        <thead>
                            <tr><th colSpan={1}>Tabela Categoria</th></tr>
                            <tr>
                                <th>Nome da Categoria</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Aqui você pode mapear os dados das categorias cadastradas */}
                            {/* Exemplo: */}
                            {/* {categorias.map((categoria) => (
                                <tr key={categoria.id}>
                                    <td>{categoria.nome_categoria}</td>
                                </tr>
                            ))} */}
                        </tbody>
                   </table>
                </div>
             </div>
           
        </div>
    );
};
export default Categoria;