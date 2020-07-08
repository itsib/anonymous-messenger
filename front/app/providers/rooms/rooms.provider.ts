import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Room, User } from '@types';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { UserProvider } from '../user/user.provider';

@Injectable({providedIn: 'root'})
export class RoomsProvider {

  rooms: BehaviorSubject<Room[]>;

  protected _socket: SocketIOClient.Socket;

  constructor(private auth: AuthService, private router: Router, private userProvider: UserProvider) {

    this.rooms = new BehaviorSubject<Room[]>([]);

    this.auth.isAuthenticatedStream().subscribe((isLogged: boolean) => {
      if (this._socket) {
        this._socket.removeAllListeners();
        this._socket.close();
        this._socket = null;
      }

      if (isLogged) {
        this._socket = io(environment.host, {path: '/socket', query: {token: this.auth.token}});
        this._socket.on('list-room', this.onListRoom());
        this._socket.on('joined-room', this.onJoinedRoom());
        this._socket.on('left-room', this.onLeftRoom());
        this._socket.on('user-online', this.onUserOnline());
        this._socket.on('user-offline', this.onUserOffline());
        this._socket.on('message', (message) => {
          console.log(message);
        });

        this._socket.on('error', (error: string) => {
          if (error === 'not_authorized') {
            this.auth.logout();
            this.router.navigate(['/']);
          }
        });
      }
    });
  }

  message(data: {roomId, message}): void {
    this._socket.emit('message', data);
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
    this._socket.emit('join-room', {roomId});
  }

  /**
   * The user left the room
   */
  leaveRoom(roomId: string): void {
    this._socket.emit('leave-room', {roomId});
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
  private onJoinedRoom(): (room: Room) => void {
    return (room: Room): void => {
      this.rooms.pipe(first()).subscribe((rooms: Room[]) => {
        const index = rooms.findIndex(i => i._id === room._id);
        if (index !== -1) {
          rooms.splice(index, 1, room);
        } else {
          rooms.push(room);
        }
        this.rooms.next(rooms);
      });
    };
  }

  /**
   * Some user leave room
   */
  private onLeftRoom(): (event: {roomId: string, userId: string}) => void {
    return (event: {roomId: string, userId: string}): void => {
      forkJoin([this.userProvider.getMe().pipe(first()), this.rooms.pipe(first())])
        .subscribe(([user, rooms]: [User, Room[]]) => {
          if (user._id === event.userId) {
            rooms = rooms.filter(i => i._id !== event.roomId);
          } else {
            rooms.forEach(room => {
              if (room._id === event.roomId) {
                room.clients = room.clients.filter(i => i._id !== event.userId);
              }
            });
          }
          this.rooms.next(rooms);
        });
    };
  }

  /**
   * User in online
   */
  private onUserOnline(): (userId: string) => void {
    return (userId: string): void => {
      this.rooms.pipe(first()).subscribe((rooms: Room[]) => {
        rooms = rooms.map(room => {
          room.clients.forEach(client => {
            if (client._id === userId) {
              client.online = true;
            }
          });
          return room;
        });

        this.rooms.next(rooms);
      });
    };
  }

  /**
   * User is offline
   */
  private onUserOffline(): (userId: string) => void {
    return (userId: string): void => {
      this.rooms.pipe(first()).subscribe((rooms: Room[]) => {
        rooms = rooms.map(room => {
          room.clients.forEach(client => {
            if (client._id === userId) {
              client.online = false;
            }
          });
          return room;
        });

        this.rooms.next(rooms);
      });
    };
  }
}
