import { Component, OnInit } from '@angular/core';
import { SocketProvider } from '../../providers/socket/socket.provider';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private socket: SocketProvider) { }

  ngOnInit(): void {
  }

}
