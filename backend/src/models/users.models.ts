import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

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
  level: { type: Number, default: 0 },
  lastLoginDate: { default: new Date(), type: Date },
  loginStreak: { default: 0, type: Number },
  createdAt: { default: new Date(), type: Date },
});

export const UserModel = model<User & Document>('User', UserSchema);
