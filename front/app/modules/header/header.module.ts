import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { UserSettingsDialogModule } from '../user-settings-dialog/user-settings-dialog.module';
import { HeaderComponent } from './header.component';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    TranslateModule,
    UserSettingsDialogModule
  ],
  exports: [
    HeaderComponent,
  ],
  declarations: [
    HeaderComponent
  ],
})
export class HeaderModule { }
