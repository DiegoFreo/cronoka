import mongoose from 'mongoose';

const CategoriaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    baterias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bateria' }],
}, { timestamps: true });

export default mongoose.models.Categoria || mongoose.model('Categoria', CategoriaSchema);