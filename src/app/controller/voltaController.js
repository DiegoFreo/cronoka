import Volta from '../model/volta.js';

// Criar uma nova volta
export async function criarVolta(dados) {
  try {
    const novaVolta = new Volta(dados);
    await novaVolta.save();
    return { status: 201, data: novaVolta };
  } catch (err) {
    return { status: 400, error: err.message };
  }
}
// Listar todas as voltas
export async function listarVoltas(req, res) {
    try {
        const voltas = await Volta.find();
        res.status(200).json(voltas);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
export async function obterVoltasPorPiloto(req, res) {
    try {
        const { pilotoId } = req.params;
        const voltas = await Volta.find({ pilotoId });
        res.status(200).json(voltas);

    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
export async function obterVoltasPorBateria(req, res) {
    try {
        const { bateriaId } = req.params;
        const voltas = await Volta.find({ bateriaId });
        res.status(200).json(voltas);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
// Atualizar uma volta existente
export async function atualizarVolta(req, res) {
  try {
    const { id } = req.params;
    const voltaAtualizada = await Volta.findByIdAndUpdate(id, req.body, { new: true });
    if (!voltaAtualizada) {
      return res.status(404).json({ erro: 'Volta não encontrada' });
    }
    res.status(200).json(voltaAtualizada);
    } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
// Deletar uma volta
export async function deletarVolta(req, res) {
  try {
    const { id } = req.params;
    const voltaDeletada = await Volta.findByIdAndDelete(id);
    if (!voltaDeletada) {
      return res.status(404).json({ erro: 'Volta não encontrada' });
    }
    res.status(200).json({ mensagem: 'Volta deletada com sucesso' });
    } catch (err) {
    res.status(500).json({ erro: err.message });
    }
}

