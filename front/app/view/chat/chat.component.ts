import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoomDialogComponent } from '../../modules/create-room-dialog/create-room-dialog.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  isOpen: boolean;

  form: FormGroup;

  constructor(private dialog: MatDialog) {
    this.form = new FormGroup({
      message: new FormControl('', [Validators.required])
    });
  }

  /**
   * Component init handler
   */
  ngOnInit(): void {

  }

  /**
   * Create new private room
   */
  createRoom(): void {
    this.dialog.open(CreateRoomDialogComponent);
  }
}
