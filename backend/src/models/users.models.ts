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
  createdAt: { default: Date.now(), type: Date },
});

export const UserModel = model<User & Document>('User', UserSchema);
