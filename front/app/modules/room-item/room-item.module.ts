import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LeaveRoomModalModule } from '../leave-room-modal/leave-room-modal.module';
import { RoomItemComponent } from './room-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    TranslateModule,
    MatButtonModule,
    MatMenuModule,
    MatRippleModule,
    LeaveRoomModalModule,
  ],
  exports: [
    RoomItemComponent,
  ],
  declarations: [
    RoomItemComponent
  ],
})
export class RoomItemModule { }
