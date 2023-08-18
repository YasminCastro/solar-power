import { model, Schema, Document } from 'mongoose';
import { PowerGenerated } from '@/interfaces/powerGenerated.interface';

const PowerGeneratedSchema: Schema = new Schema({
  createdAt: { default: Date.now(), type: Date },
  inverterId: {
    type: String,
    required: true,
  },
  powerInRealTime: {
    type: String,
  },
  powerToday: {
    type: String,
  },
  powerMonth: {
    type: String,
  },
  powerYear: {
    type: String,
  },
  allPower: {
    type: String,
  },
  co2: {
    type: String,
  },
  coal: {
    type: String,
  },
  tree: {
    type: String,
  },
});

export const PowerGeneratedModel = model<PowerGenerated & Document>('PowerGenerated', PowerGeneratedSchema);
