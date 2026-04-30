import mongoose from 'mongoose';

const EventoSchema = new mongoose.Schema({
    nome_evento: { type: String, required: true },
    data_inicio: { type: Date, required: true },
    data_fim: { type: Date, required: true },
    hora_evento: { type: String, required: true },
    local_evento: { type: String, required: false },
    descricao_evento: { type: String, required: false },
    baterias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bateria' }],
}, { timestamps: true });

const Evento = mongoose.models.Evento || mongoose.model('Evento', EventoSchema);

export default Evento;
