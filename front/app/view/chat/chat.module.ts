import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { AutosizeModule } from 'ngx-autosize';
import { HeaderModule } from '../../modules/header/header.module';
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
  ],
  exports: [
    ChatComponent
  ],
  declarations: [
    ChatComponent
  ],
})
export class ChatModule { }
