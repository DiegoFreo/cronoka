import mongoose from 'mongoose';

const CategoriaSchema = new mongoose.Schema({
    nome: { type: String, required: true },   
    pilotos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Piloto' }],
}, { timestamps: true });

export default mongoose.models.Categoria || mongoose.model('Categoria', CategoriaSchema);