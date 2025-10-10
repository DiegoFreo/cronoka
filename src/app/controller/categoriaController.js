import Categoria from '../model/categoria.js';

// Criar uma nova categoria
export async function criarCategoria(req, res) {
    try {
        const novaCategoria = new Categoria(req.body);
        const resultado = await novaCategoria.save();
        res.status(201).json(resultado);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
// Listar todas as categorias
export async function listarCategorias(req, res) {
    try {
        const categorias = await Categoria.find();
        res.status(200).json(categorias);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
//atualizar categoria
export async function atualizarCategoria(req, res) {
    try {
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
export async function deletarCategoria(req, res) {
    try {
        const categoriaDeletada = await Categoria.findByIdAndDelete(req.params.id);
        if (!categoriaDeletada) {
            return res.status(404).json({ erro: 'Categoria não encontrada' });
        }
        res.status(200).json({ mensagem: 'Categoria deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
