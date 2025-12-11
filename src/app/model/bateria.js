import mongoose from 'mongoose';
import { type } from 'os';

const BateriaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    categotria:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }],
    hora_inicio: { type: String, required: true },
    hora_final: { type: String, required: true },
}, { timestamps: true });
 
export default mongoose.models.Bateria || mongoose.model('Bateria', BateriaSchema);