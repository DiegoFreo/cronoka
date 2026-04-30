<<<<<<< HEAD
import Categoria from '../model/categoria.js';
=======
import Categoria from '../model/categoria';
>>>>>>> ee9061d718d7003358dff4b156bbd5e7f07b5640
import conectDB from '../../lib/mongodb';

// Criar uma nova categoria
export async function criarCategoria(req) {
    try {
       await conectDB();
        const novaCategoria = new Categoria(req);
        await novaCategoria.save();
        return { status: 201, data: novaCategoria };
    } catch (err) {
        return { status: 400, erro: err.message };
    }
}
// Listar todas as categorias
export async function listarCategorias() {
    try {
       await conectDB();
       const categorias = await Categoria.find();
       return categorias;
    } catch (err) {
       return {status: 500, error: err.message};
    }
}
//atualizar categoria
<<<<<<< HEAD
export async function atualizarCategoria(req, res) {
    try {
        await conectDB();
        const categoriaAtualizada = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!categoriaAtualizada) {
            return res.status(404).json({ erro: 'Categoria não encontrada' });
        }
        res.status(200).json(categoriaAtualizada);
    } catch (err) {
        res.status(500).json({ erro: err.message });
=======
export async function atualizarCategoria(id, dados) {
  try {
    await conectDB();

    const categoriaAtualizada = await Categoria.findByIdAndUpdate(id, dados, { new: true });

    if (!categoriaAtualizada) {
      return { status: 404, error: "Categoria não encontrada" };
>>>>>>> ee9061d718d7003358dff4b156bbd5e7f07b5640
    }

    return { status: 200, data: categoriaAtualizada };
  } catch (err) {
    console.error("Erro ao atualizar categoria:", err);
    return { status: 500, error: err.message };
  }
}
//deletar categoria
export async function deletarCategoria(dados) {
    try{
        await conectDB();
        const deletaCategoria = Categoria.findByIdAndDelete(dados);
        if(!deletaCategoria){
            return {status: 400, erro: err.message}
        }else{
        return{status:200, message:"Catagoria Deletada!"}
        }        
    }catch(err){
         return {status: 500, error: err.message};
    }
}
