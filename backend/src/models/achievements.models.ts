import { model, Schema, Document } from 'mongoose';
import { Achievement } from '@/interfaces/achievement.interface';

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

export const AchivementsModel = model<Achievement & Document>('Achievements', AchivementsSchema);
