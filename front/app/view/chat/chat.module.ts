import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AutosizeModule } from 'ngx-autosize';
import { CreateRoomDialogModule } from '../../modules/create-room-dialog/create-room-dialog.module';
import { HeaderModule } from '../../modules/header/header.module';
import { RoomItemModule } from '../../modules/room-item/room-item.module';
import { ChatComponent } from './chat.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    AutosizeModule,
    ReactiveFormsModule,
    CreateRoomDialogModule,
    RouterModule,
    RoomItemModule,
  ],
  exports: [
    ChatComponent
  ],
  declarations: [
    ChatComponent
  ],
})
export class ChatModule { }
