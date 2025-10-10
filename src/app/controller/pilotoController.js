import Piloto from '../model/piloto';

// Criar um novo piloto
export async function criarPiloto(dados) {
  try {
    await conectDb();
    const novoPiloto = new Piloto(dados);
    const resultado = await novoPiloto.save();
    res.status(201).json(resultado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
// Listar todos os pilotos
export async function listarPilotos(req, res) {
  try {
    await conectDb();
    const pilotos = await Piloto.find();
    res.status(200).json(pilotos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
// Atualizar um piloto
export async function atualizarPiloto(req, res) {
  try {
    await conectDb();
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
    await conectDb(); 
    const pilotoDeletado = await Piloto.findByIdAndDelete(req.params.id);
    if (!pilotoDeletado) {
      return res.status(404).json({ erro: 'Piloto não encontrado' });
    }
    res.status(200).json({ mensagem: 'Piloto deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

