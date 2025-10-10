import Tag from '../model/tags.js';

// Criar uma nova tag
export async function criarTag(req, res) {
    try {
        const novaTag = new Tag(req.body);
        const resultado = await novaTag.save();
        res.status(201).json(resultado);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
// Listar todas as tags
export async function listarTags(req, res) {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
// Atualizar uma tag
export async function atualizarTag(req, res) {
    try {
        const tagAtualizada = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tagAtualizada) {
            return res.status(404).json({ erro: 'Tag não encontrada' });
        }
        res.status(200).json(tagAtualizada);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
// Deletar uma tag
export async function deletarTag(req, res) {
    try {
        const tagDeletada = await Tag.findByIdAndDelete(req.params.id);
        if (!tagDeletada) {
            return res.status(404).json({ erro: 'Tag não encontrada' });
        }
        res.status(200).json({ mensagem: 'Tag deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}   