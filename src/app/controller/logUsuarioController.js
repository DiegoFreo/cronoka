import LogUsuario from '../model/logusuario.js';
// Criar um novo log de usuário
export async function criarLogUsuario(req, res) {
    try {
        const novoLog = new LogUsuario(req.body);
        const resultado = await novoLog.save();
        res.status(201).json(resultado);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
// Listar todos os logs de usuário
export async function listarLogsUsuario(req, res) {
    try {
        const logs = await LogUsuario.find().populate('usuarioId', 'nome email');
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
//atualizar log de usuário
export async function atualizarLogUsuario(req, res) {
    try {
        const logAtualizado = await LogUsuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!logAtualizado) {
            return res.status(404).json({ erro: 'Log de usuário não encontrado' });
        }
        res.status(200).json(logAtualizado);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}