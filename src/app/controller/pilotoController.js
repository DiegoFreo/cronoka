import conectDB from '../../lib/mongodb';
import Piloto from '../model/piloto';

// Criar um novo piloto
export async function criarPiloto(dados) {
  try {
    await conectDB();
    const novoPiloto = new Piloto(dados);
    await novoPiloto.save();
    return { status: 201, data: novoPiloto };
  } catch (err) {
    return { status: 400, erro: err.message };
  }
}
// Listar todos os pilotos
export async function listarPilotos(req, res) {
  try {
    await conectDB();
    const pilotos = await Piloto.find();
    res.status(200).json(pilotos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
// Atualizar um piloto
export async function atualizarPiloto(req, res) {
  try {
    await conectDB();
    const pilotoAtualizado = await Piloto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pilotoAtualizado) {
      return res.status(404).json({ erro: 'Piloto não encontrado' });
    }
    res.status(200).json(pilotoAtualizado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
// Deletar um piloto
export async function deletarPiloto(req, res) {
  try {
    await conectDB(); 
    const pilotoDeletado = await Piloto.findByIdAndDelete(req.params.id);
    if (!pilotoDeletado) {
      return res.status(404).json({ erro: 'Piloto não encontrado' });
    }
    res.status(200).json({ mensagem: 'Piloto deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

