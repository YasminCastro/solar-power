import { model, Schema, Document } from 'mongoose';
import { Inverter } from '@/interfaces/inverter.interface';

const InverterSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    required: false,
    default: true,
  },
  cep: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  long: {
    type: String,
    required: true,
  },
  maxRealTimePower: {
    type: Number,
    required: true,
  },
  createdAt: { default: Date.now(), type: Date },
});

export const InverterModel = model<Inverter & Document>('Inverter', InverterSchema);
