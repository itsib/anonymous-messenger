import * as Peer from 'simple-peer';

export class Room {

  protected _peers: { [userId: string]: Peer.Instance };

  constructor() {

    this._peers = {};
  }
}
