import Bateria from '../model/bateria.js';

// Criar uma nova bateria
export async function criarBateria(req, res) {
    try {
        const novaBateria = new Bateria(req.body);
        const resultado = await novaBateria.save();
        res.status(201).json(resultado);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
// Listar todas as baterias
export async function listarBaterias(req, res) {
    try {
        const baterias = await Bateria.find();
        res.status(200).json(baterias);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}   
//atualizar bateria
export async function atualizarBateria(req, res) {
    try {
        const bateriaAtualizada = await Bateria.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bateriaAtualizada) {
            return res.status(404).json({ erro: 'Bateria não encontrada' });
        }
        res.status(200).json(bateriaAtualizada);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
//deletar bateria
export async function deletarBateria(req, res) {
    try {
        const bateriaDeletada = await Bateria.findByIdAndDelete(req.params.id);
        if (!bateriaDeletada) {
            return res.status(404).json({ erro: 'Bateria não encontrada' });
        }
        res.status(200).json({ mensagem: 'Bateria deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
