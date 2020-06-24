import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { ChatComponent } from './view/chat/chat.component';
import { IndexComponent } from './view/index/index.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'chat',
    canActivate: [AuthGuard],
    component: ChatComponent
  }
];
