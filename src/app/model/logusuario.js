import mongoose from 'mongoose';

const LogUsuarioSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    acao: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.LogUsuario || mongoose.model('LogUsuario', LogUsuarioSchema);