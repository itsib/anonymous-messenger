import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ChatComponent
  ],
  declarations: [
    ChatComponent
  ],
})
export class ChatModule { }
