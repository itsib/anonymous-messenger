import * as socketio from 'socket.io';
import { Socket } from 'socket.io';
import { Room, RoomDocument } from '../models/room.model';
import { User, UserDocument } from '../models/user.model';


export async function connectionHandler(this: socketio.Server, socket: Socket) {
  const userId = socket.handshake['userId'];
  const user: UserDocument = await User.findById(userId);

  user.online = true;
  await user.save();

  const rooms = await Room.getUserRooms(userId);

  // Send I'm online
  let socketRoomsToSend: socketio.Namespace;
  rooms.forEach(room => {
    socket.join(`${room._id}`);
    socketRoomsToSend = (socketRoomsToSend ? socketRoomsToSend : this).to(`${room._id}`);
  });
  socketRoomsToSend && socketRoomsToSend.emit('user-online', user.getProfile());

  // Send rooms list
  socket.emit('list-room', rooms);

  console.log(`User ${user.login} is connected.`);

  /**
   * Create new room
   */
  socket.on('new-room', async (roomData: {name: string, protected: boolean}) => {
    try {
      await Room.create(Object.assign(roomData, {clients: [user]}) as RoomDocument);
      socket.emit('list-room', await Room.getUserRooms(userId));
    } catch (e) {
      console.log(e);
    }
  });

  /**
   * Join to room
   */
  socket.on('join-room', ({id}: {id: string}) => {
    console.log(id);
  });

  /**
   * Update room name
   */
  socket.on('update-room', (room: {}) => {

  });

  /**
   * User send leave room
   */
  socket.on('leave-room', ({id}: {id: string}) => {

  });

  /**
   * Disconnect
   */
  socket.on('disconnect', async () => {
    user.online = false;
    await user.save();
    console.log(`User ${user.login} disconnect`);
  });
}

function onConnect() {

}
