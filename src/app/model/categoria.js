import mongoose from 'mongoose';

const CategoriaSchema = new mongoose.Schema({
    nome: { type: String, required: true },   
<<<<<<< HEAD
    pilotos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Piloto' }],
=======
    //pilotos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Piloto' }],
>>>>>>> ee9061d718d7003358dff4b156bbd5e7f07b5640
}, { timestamps: true });

const Categoria = mongoose.models.Categoria || mongoose.model('Categoria', CategoriaSchema);
 
export default Categoria;