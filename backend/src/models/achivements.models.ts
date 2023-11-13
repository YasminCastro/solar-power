import { model, Schema, Document } from 'mongoose';
import { Achivement } from '@/interfaces/achivements.interface';

const AchivementsSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  points: {
    type: Number,
    required: true,
  },
  createdAt: { default: Date.now(), type: Date },
});

export const AchivementsModel = model<Achivement & Document>('Achivements', AchivementsSchema);
