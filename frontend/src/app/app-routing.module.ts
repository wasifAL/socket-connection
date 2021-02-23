import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ChatInboxComponent} from './chat-inbox/chat-inbox.component';
import {RoomComponent} from './room/room.component';

const routes: Routes = [
  {
    path: '',
    component: RoomComponent
  },
  {
    path: 'chat/:room/:user',
    component: ChatInboxComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
