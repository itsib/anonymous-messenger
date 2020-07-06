import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import { config } from '../config';

interface UserModel extends mongoose.Document {

  login: string;

  password: string;

  online: boolean;

  createdAt: string;

  updatedAt: string;

  getAuthToken: () => string;

  checkPassword: (password: string) => Promise<boolean>;
}

const UserModeSchema = new mongoose.Schema(
  {
    login: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    online: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

UserModeSchema.methods.getAuthToken = function(): string {
  return jwt.sign({ _id: this._id }, config.secret, { expiresIn: '30d' });
};

UserModeSchema.methods.checkPassword = async function(password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<UserModel>('User', UserModeSchema);

export { User, UserModel };
