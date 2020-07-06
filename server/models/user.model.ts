import * as mongoose from 'mongoose';

interface UserModel extends mongoose.Document {

  login: string;

  password: string;

  online: boolean;

  createdAt: string;

  updatedAt: string;
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

const User = mongoose.model<UserModel>('User', UserModeSchema);

export { User, UserModel };
