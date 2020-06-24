import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../../modules/header/header.module';
import { ChatComponent } from './chat.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
  ],
  exports: [
    ChatComponent
  ],
  declarations: [
    ChatComponent
  ],
})
export class ChatModule { }
