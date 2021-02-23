import {Component, OnInit} from '@angular/core';
import {io} from 'socket.io-client';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit {
  SOCKET_ENDPOINT = 'localhost:3000';
  socket: any;
  message: string;

  constructor() {
  }

  ngOnInit(): void {
    this.setupSocketConnection();
  }

  setupSocketConnection(): void {
    // @ts-ignore
    this.socket = io(this.SOCKET_ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding =  '15px 30px';
        element.style.margin = '10px';
        document.getElementById('chat-messages-show-list').appendChild(element);
      }
    });
  }

  SendMessage(): void {
    this.socket.emit('message', this.message);
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding =  '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('chat-messages-show-list').appendChild(element);
    this.message = '';
  }
}
