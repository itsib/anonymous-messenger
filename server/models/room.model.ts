import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { UserDocument } from './user.model';

interface RoomDocument extends mongoose.Document {

  name: string;

  protected: boolean;

  clients: (mongoose.Types.ObjectId | UserDocument)[];

  createdAt: string;

  updatedAt: string;
}

interface RoomModel extends mongoose.Model<RoomDocument> {

  getUserRooms: (userId: string) => Promise<RoomDocument[]>;
}

const RoomModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    protected: {
      type: Boolean,
      default: false,
    },
    clients: [{
      type: mongoose.Types.ObjectId,
      ref: 'User',
    }],
  },
  {
    timestamps: true,
  },
);

/**
 * Get all rooms of current user
 */
RoomModelSchema.statics.getUserRooms = async function(userId: string): Promise<RoomDocument[]> {
  return  await this.find({clients: mongoose.Types.ObjectId(userId)})
    .populate('clients', '_id login online createdAt updatedAt')
    .exec();
};

const Room: RoomModel = mongoose.model<RoomDocument, RoomModel>('Room', RoomModelSchema);

export { Room, RoomDocument };
