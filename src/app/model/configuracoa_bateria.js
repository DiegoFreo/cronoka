import mongoose from "mongoose";

const ConfiguracaoBateriaSchema = new mongoose.Schema({
    bateriaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bateria' },
    numero_voltas: { type: Number, required: true },
    clasifficacao_melhor_tempo: { type: Boolean, required: false },
    classificacao_quantidade_voltas: { type: Boolean, required: false},
    duracao_minutos: { type: Number, required: true },
}, { timestamps: true });