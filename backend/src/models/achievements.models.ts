import { model, Schema, Document } from 'mongoose';
import { Achievement } from '@/interfaces/achievement.interface';

const AchivementsSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
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
  achivementImage: { type: String },
  createdAt: { default: Date.now(), type: Date },
});

export const AchivementsModel = model<Achievement & Document>('Achievements', AchivementsSchema);
