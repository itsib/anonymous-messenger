import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SocketProvider } from '../../providers/socket/socket.provider';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  isOpen: boolean;

  form: FormGroup;

  constructor(private socket: SocketProvider) {
    this.form = new FormGroup({
      message: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {

  }

}
