import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RoomsProvider } from '../../providers/rooms/rooms.provider';

@Component({
  selector: 'app-leave-room-modal',
  templateUrl: './leave-room-modal.component.html',
  styleUrls: ['./leave-room-modal.component.scss']
})
export class LeaveRoomModalComponent {

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<LeaveRoomModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { roomId: string },
    private roomProvider: RoomsProvider,
  ) { }

  /**
   * Confirm leave room
   */
  leaveRoom(): void {
    this.roomProvider.leaveRoom(this.data.roomId);
    this.router.navigate(['/chat']);
    this.dialogRef.close();
  }

  /**
   * Cancel leave room and close modal
   */
  cancel(): void {
    this.dialogRef.close();
  }
}
