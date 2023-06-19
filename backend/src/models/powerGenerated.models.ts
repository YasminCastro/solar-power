import { model, Schema, Document } from 'mongoose';
import { PowerGenerated } from '@/interfaces/powerGenerated.interface';

const PowerGeneratedSchema: Schema = new Schema({
  createdAt: { default: Date.now(), type: Date },
  userId: {
    type: String,
    required: true,
  },
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
  lat: {
    type: String,
  },
  long: {
    type: String,
  },
  localtime: {
    type: String,
  },
  tempC: {
    type: Number,
  },
  windKph: {
    type: Number,
  },
  pressureIn: {
    type: Number,
  },
  humidity: {
    type: Number,
  },
  cloud: {
    type: Number,
  },
  uv: {
    type: Number,
  },
  precipMM: {
    type: Number,
  },
});

export const PowerGeneratedModel = model<PowerGenerated & Document>('PowerGenerated', PowerGeneratedSchema);
