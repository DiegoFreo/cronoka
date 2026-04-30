import mongoose from 'mongoose';

const CategoriaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Categoria || mongoose.model('Categoria', CategoriaSchema);