import { Room, User } from '../../front/types';
import * as socketio from 'socket.io';
import { Socket } from 'socket.io';

const rooms: Map<string, Room> = new Map<string, User>();
const users: Map<string, User & {rooms: string[]}> = new Map<string, (User & {rooms: string[]})>();

export function connectionHandler(this: socketio.Server, socket: Socket) {
  const userId = socket.handshake.query.id;

  // Redis
  // const savedUser =

  // const test = await Redis.get('test');
  // console.log(test);


  users.set(userId, {
    id: socket.handshake.query.id,
    name: socket.handshake.query.name,
    rooms: []
  });

  console.log(`User ${socket.handshake.query.name} is connected.`);

  /**
   * Create new room
   */
  socket.on('new-room', (room: Room) => {
    const oldRoom: Room = rooms.get(room.id);
    if (oldRoom) {
      console.log(`Room ${oldRoom.id} room already exist`);
    } else {
      room.clients = [];
      rooms.set(room.id, room);
      socket.emit('new-room', room);
    }
  });

  /**
   * Join to room
   */
  socket.on('join-room', ({id}: {id: string}) => {
    const room: Room = rooms.get(id);
    const user = users.get(userId);
    if (room) {

      // Add user to room
      room.clients.push(user);
      socket.join(room.id);
      this.to(room.id).emit('join-room', room);

      // Add room to user
      user.rooms.push(room.id);
      users.set(userId, user);

      console.log(`${user.name} join to room ${room.name}`);
    } else {

      console.log(`Room ${id} not found`);
    }
  });

  /**
   * Update room name
   */
  socket.on('update-room', (room: Room) => {

  });

  /**
   * User send leave room
   */
  socket.on('leave-room', ({id}: {id: string}) => {

  });

  /**
   * Disconnect
   */
  socket.on('disconnect', () => {
    console.log('Socket disconnect');
  });
}

function onConnect() {

}
