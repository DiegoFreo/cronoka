import Evento from '../model/evento.js';

// Criar um novo evento
export async function criarEvento(req, res) {
    try {
        const novoEvento = new Evento(req.body);
        const resultado = await novoEvento.save();
        res.status(201).json(resultado);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
// Listar todos os eventos
export async function listarEventos() {
    try {
        const eventos = await Evento.find();
        return eventos;
    } catch (err) {
        return {status: 500, error: err.message};
    }
}
// Atualizar um evento
export async function atualizarEvento(req, res) {
    try {
        const eventoAtualizado = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!eventoAtualizado) {
            return res.status(404).json({ erro: 'Evento não encontrado' });
        }
        res.status(200).json(eventoAtualizado);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
// Deletar um evento
export async function deletarEvento(req, res) {
    try {
        const eventoDeletado = await Evento.findByIdAndDelete(req.params.id);
        if (!eventoDeletado) {
            return res.status(404).json({ erro: 'Evento não encontrado' });
        }
        res.status(200).json({ mensagem: 'Evento deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}