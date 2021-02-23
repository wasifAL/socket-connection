import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  room: string;
  user: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  enter(): void {
    console.log(this.room);
    this.router.navigateByUrl('/chat/' + this.room + '/' + this.user);
  }
}
