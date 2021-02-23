import {Component, OnInit} from '@angular/core';
import {io} from 'socket.io-client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit {
  SOCKET_ENDPOINT = 'localhost:3000';
  socket: any;
  message: string;
  roomid: string;
  userid: string;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.roomid = this.route.snapshot.paramMap.get('room');
    this.userid = this.route.snapshot.paramMap.get('user');
    this.setupSocketConnection();
  }

  setupSocketConnection(): void {
    this.socket = io(
      this.SOCKET_ENDPOINT,
      {transports: ['websocket', 'polling', 'flashsocket']});

    this.socket.on('connect', () => {
      // Connected, let's sign-up for to receive messages for this room
      this.socket.emit('join', this.roomid);
    });
    this.socket.on('broadcast', (data: string) => {
      if (data) {
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding = '15px 30px';
        element.style.margin = '10px';
        document.getElementById('chat-messages-show-list').appendChild(element);
      }
    });
  }

  SendMessage(): void {
    this.socket.emit('send', {
      room: this.roomid,
      user: this.userid,
      msg: this.message
    });
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding = '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('chat-messages-show-list').appendChild(element);
    this.message = '';
  }
}
