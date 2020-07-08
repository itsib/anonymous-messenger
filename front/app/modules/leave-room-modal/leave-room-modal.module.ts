import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { LeaveRoomModalComponent } from './leave-room-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    TranslateModule,
    MatButtonModule,
  ],
  declarations: [
    LeaveRoomModalComponent
  ],
  entryComponents: [
    LeaveRoomModalComponent
  ]
})
export class LeaveRoomModalModule { }
