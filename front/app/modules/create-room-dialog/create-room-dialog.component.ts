import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Room } from '../../../types';
import { RoomsProvider } from '../../providers/rooms/rooms.provider';

@Component({
  selector: 'app-create-room-dialog',
  templateUrl: './create-room-dialog.component.html',
  styleUrls: ['./create-room-dialog.component.scss']
})
export class CreateRoomDialogComponent {

  form: FormGroup & {loading?: boolean};

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<CreateRoomDialogComponent>,
    private roomsProvider: RoomsProvider,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('')
    });
  }

  /**
   * Create room
   */
  createRoom(): void {
    if (this.form.invalid || this.form.loading) {
      this.form.markAllAsTouched();
      return;
    }
    const room: Room = {
      name: this.form.value.name,
      protected: !!this.form.value.password
    };

    this.roomsProvider.createRoom(room);
    this.dialogRef.close();
  }

  /**
   * Cancel and close modal
   */
  cancel(): void {
    this.dialogRef.close();
  }
}
