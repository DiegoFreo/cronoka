import mongoose from 'mongoose';

const BateriaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    categotria:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }],
    hora_bateria: { type: String, required: true },
    //eventoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Evento' },
    //pilotos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Piloto' }],
}, { timestamps: true });
 
export default mongoose.models.Bateria || mongoose.model('Bateria', BateriaSchema);