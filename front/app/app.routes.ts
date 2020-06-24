import { Routes } from '@angular/router';
import { ChatComponent } from './view/chat/chat.component';
import { IndexComponent } from './view/index/index.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  }
];
