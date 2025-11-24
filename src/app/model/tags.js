import mongoose from 'mongoose';
import { unique } from 'next/dist/build/utils';

const TagSchema = new mongoose.Schema({
    tag: { type: String, required: true, unique: true },
}, { timestamps: true });
export default mongoose.models.Tag || mongoose.model('Tag', TagSchema);