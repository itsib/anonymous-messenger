import * as socketio from 'socket.io';
import { Socket } from 'socket.io';
import { Room, RoomDocument } from '../models/room.model';
import { User, UserDocument } from '../models/user.model';


export async function connectionHandler(this: socketio.Server, socket: Socket) {
  const userId = socket.handshake['userId'];
  const user: UserDocument = await User.findById(userId).select('_id login online createdAt updatedAt');

  await sendOnline.call(this);

  socket.on('message', (event: {roomId: string, message: string}) => {
    socket.broadcast.to(event.roomId).emit('message', event);
  });

  /**
   * Create new room
   */
  socket.on('new-room', async (roomData: {name: string, protected: boolean}) => {
    try {
      const room = await Room.create(Object.assign(roomData, {clients: [user]}) as RoomDocument);
      socket.join(`${room._id}`);
      socket.emit('list-room', await Room.getUserRooms(userId));
    } catch (e) {
      console.log(e);
    }
  });

  /**
   * Join to room
   */
  socket.on('join-room', async (event: {roomId: string}) => {
    const room = await Room.findById(event.roomId).populate('clients', '_id login online createdAt updatedAt').exec();
    if (room && !room.clients.some((client: UserDocument) => `${client._id}` === userId)) {
      room.clients = room.clients.concat(user);
      await room.save();

      socket.join(`${room._id}`);

      this.to(`${room._id}`).emit('joined-room', room);
    }
  });

  /**
   * Leave from room
   */
  socket.on('leave-room', async (event: {roomId: string}) => {
    const room = await Room.findById(event.roomId).exec();
    if (room) {
      room.clients = room.clients.filter((client: UserDocument) => `${client._id}` !== userId);

      if (room.clients.length) {
        await room.save();
      } else {
        await room.remove();
      }
      this.to(`${room._id}`).emit('left-room', {roomId: room._id, userId});
      socket.leave(`${room._id}`);
    }
  });

  /**
   * Update room name
   */
  socket.on('update-room', (room: {}) => {

  });

  /**
   * Disconnect
   */
  socket.on('disconnect', async () => {
    sendOffline.call(this);
  });

  /**
   * Send I'm online
   */
  async function sendOnline(this: socketio.Server) {
    user.online = true;
    await user.save();

    const rooms = await Room.getUserRooms(userId);

    // Send I'm online to all rooms
    let socketRoomsToSend: socketio.Namespace;
    rooms.forEach(room => {
      socket.join(`${room._id}`);
      socketRoomsToSend = (socketRoomsToSend ? socketRoomsToSend : this).to(`${room._id}`);
    });
    socketRoomsToSend && socketRoomsToSend.emit('user-online', user._id);

    // Send me rooms list
    socket.emit('list-room', rooms);

    console.log(`User ${user.login} is connected.`);
  }

  /**
   * Send I'm offline
   */
  async function sendOffline(this: socketio.Server) {
    user.online = false;
    await user.save();

    const rooms = await Room.getUserRooms(userId);

    // Send I'm online to all rooms
    let socketRoomsToSend: socketio.Namespace;
    rooms.forEach(room => {
      socketRoomsToSend = (socketRoomsToSend ? socketRoomsToSend : this).to(`${room._id}`);
    });
    socketRoomsToSend && socketRoomsToSend.emit('user-offline', user._id);

    console.log(`User ${user.login} disconnect`);
  }
}
