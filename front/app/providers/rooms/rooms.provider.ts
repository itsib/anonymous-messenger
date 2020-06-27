import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class RoomsProvider {

  private _socket: any;

  constructor() {
    this._socket = io(environment.host);
  }
}
