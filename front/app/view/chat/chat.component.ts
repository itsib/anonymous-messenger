import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '@types';
import { SubStore } from '../../common/sub-store';
import { CreateRoomDialogComponent } from '../../modules/create-room-dialog/create-room-dialog.component';
import { RoomsProvider } from '../../providers/rooms/rooms.provider';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  rooms: Room[];

  isOpen: boolean;

  form: FormGroup;

  roomId: string;

  private _subStore: SubStore;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private roomsProvider: RoomsProvider
  ) {
    this.form = new FormGroup({
      message: new FormControl('', [Validators.required]),
      roomId: new FormControl('', [Validators.required])
    });

    this._subStore = new SubStore();
  }

  /**
   * Component init handler
   */
  ngOnInit(): void {

    this._subStore.sub = this.route.params.subscribe(({roomId}) => {
      if (roomId) {
        this.roomsProvider.joinRoom(roomId);
      }
      this.form.get('roomId').setValue(roomId);
    });

    this._subStore.sub = this.roomsProvider.rooms.subscribe((rooms: Room[]) => this.rooms = rooms);
  }

  /**
   * Component destroy handler
   */
  ngOnDestroy(): void {
    this._subStore.destroy();
  }

  /**
   * Create new private room
   */
  createRoom(): void {
    this.dialog.open(CreateRoomDialogComponent);
  }

  sendMessage(): void {
    if (this.form.valid) {
      this.roomsProvider.message(this.form.value);
      this.form.get('message').setValue('');
    }
  }
}
