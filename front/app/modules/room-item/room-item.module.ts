import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RoomItemComponent } from './room-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    TranslateModule,
    MatButtonModule,
  ],
  exports: [
    RoomItemComponent,
  ],
  declarations: [
    RoomItemComponent
  ],
})
export class RoomItemModule { }
