import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const InverterSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
});

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: { default: Date.now(), type: Date },
  inverters: {
    type: [InverterSchema],
    required: false,
  },
});

export const UserModel = model<User & Document>('User', UserSchema);
