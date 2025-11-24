import mongoose from 'mongoose';

const TagSchema = new mongoose.Schema({
    num: {type:String, require:true, unique: true},
    tag: { type: String, required: true, unique: true },
}, { timestamps: true });
export default mongoose.models.Tag || mongoose.model('Tag', TagSchema);