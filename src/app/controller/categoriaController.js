import Categoria from '../model/categoria.js';
import conectDB from '../../lib/mongodb';

// Criar uma nova categoria
export async function criarCategoria(req, res) {
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
