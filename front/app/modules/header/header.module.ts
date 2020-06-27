import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './header.component';



@NgModule({
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    TranslateModule,
  ],
})
export class HeaderModule { }
