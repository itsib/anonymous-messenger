import { Injectable } from '@angular/core';
import { EventType, Room } from '../../../types';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({providedIn: 'root'})
export class RoomsProvider {

  rooms: Room[];

  protected _socket: SocketIOClient.Socket;

  constructor(private auth: AuthService) {

    this.rooms = [];

    this.auth.isAuthenticatedStream().subscribe((isLogged: boolean) => {
      if (this._socket) {
        this._socket.removeAllListeners();
        this._socket.close();
      }

      if (isLogged) {
        // const user = this.auth.getUser();
        // this._socket = io(environment.host, {path: '/socket', query: {id: user.id, name: user.name}});
        // this._socket.on('new-room', this.onNewRoom());
        // this._socket.on('join-room', this.onJoinRoom());
        // this._socket.on('leave-room', this.onLeaveRoom());
      }
    });
  }

  /**
   * Create new room
   */
  createRoom(room: Room): void {
    const data: Room = {
      id: room.id,
      name: room.name
    };
    this._socket.emit('new-room' as EventType, data);
  }

  /**
   * To join room
   */
  joinRoom(roomId: string): void {
    this._socket.emit('join-room' as EventType, {id: roomId});
  }

  /**
   * New room handler
   */
  private onNewRoom(): (room: Room) => void {
    return (room: Room) => {
      if (!this.rooms.some(i => i.id === room.id)) {
        this.rooms.push(room);
      }
    };
  }

  /**
   * Join room handler
   */
  private onJoinRoom(): (room: Room) => void {
    return (room: Room): void => {
      const index = this.rooms.findIndex(i => i.id === room.id);
      if (index === -1) {
        this.rooms.push(room);
      } else {
        this.rooms.splice(index, 1, room);
      }
    };
  }

  /**
   * Some user leave room
   */
  private onLeaveRoom(): (event: {roomId: string, userId: string}) => void {
    return (event: {roomId: string, userId: string}): void => {

    };
  }
}
