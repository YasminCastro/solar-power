import { model, Schema, Document } from 'mongoose';
import { PowerGenerated } from '@/interfaces/powerGenerated.interface';

const PowerGeneratedSchema: Schema = new Schema({
  createdAt: { default: new Date(), type: Date },
  inverterId: {
    type: String,
    required: true,
  },
  powerInRealTime: {
    type: Number,
  },
  powerToday: {
    type: Number,
  },
  powerMonth: {
    type: Number,
  },
  powerYear: {
    type: Number,
  },
  allPower: {
    type: Number,
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
