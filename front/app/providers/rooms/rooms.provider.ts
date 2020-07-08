import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EventType, Room } from '@types';
import { BehaviorSubject } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({providedIn: 'root'})
export class RoomsProvider {

  rooms: BehaviorSubject<Room[]>;

  protected _socket: SocketIOClient.Socket;

  constructor(private auth: AuthService, private router: Router) {

    this.rooms = new BehaviorSubject<Room[]>([]);

    this.auth.isAuthenticatedStream().subscribe((isLogged: boolean) => {
      if (this._socket) {
        this._socket.removeAllListeners();
        this._socket.close();
      }

      if (isLogged) {
        this._socket = io(environment.host, {path: '/socket', query: {token: this.auth.token}});
        this._socket.on('list-room', this.onListRoom());
        this._socket.on('join-room', this.onJoinRoom());
        this._socket.on('leave-room', this.onLeaveRoom());

        this._socket.on('error', (error: string) => {
          if (error === 'not_authorized') {
            this.auth.logout();
            this.router.navigate(['/']);
          }
        });
      }
    });
  }

  /**
   * Create new room
   */
  createRoom(room: Room): void {
    this._socket.emit('new-room', room);
  }

  /**
   * To join room
   */
  joinRoom(roomId: string): void {
    this._socket.emit('join-room' as EventType, {id: roomId});
  }

  /**
   * Returns room list after connection
   */
  private onListRoom(): (rooms: Room[]) => void {
    return (rooms: Room[]): void => {
      this.rooms.next(rooms);
    };
  }

  /**
   * Join room handler
   */
  private onJoinRoom(): (room: Room) => void {
    return (room: Room): void => {

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
