import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-room-dialog',
  templateUrl: './create-room-dialog.component.html',
  styleUrls: ['./create-room-dialog.component.scss']
})
export class CreateRoomDialogComponent {

  form: FormGroup & {loading?: boolean};

  constructor(
    private dialogRef: MatDialogRef<CreateRoomDialogComponent>
  ) {
    this.form = new FormGroup({
      roomName: new FormControl('', [Validators.required])
    });
  }

  /**
   * Create room
   */
  createRoom(): void {

    this.form.loading = true;
  }

  /**
   * Cancel and close modal
   */
  cancel(): void {
    this.dialogRef.close();
  }
}
