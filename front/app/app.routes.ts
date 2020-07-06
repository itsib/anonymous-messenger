import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { ForwardGuard } from './services/auth/forward.guard';
import { ChatComponent } from './view/chat/chat.component';
import { IndexComponent } from './view/index/index.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [ForwardGuard],
    component: IndexComponent
  },
  {
    path: 'chat',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ChatComponent
      },
      {
        path: ':roomId',
        component: ChatComponent
      }
    ]
  }
];
