import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { TranslateMessageCompiler } from './common/translate-message-compiler';
import { RoomsProvider } from './providers/rooms/rooms.provider';
import { AuthGuard } from './services/auth/auth.guard';
import { StorageService } from './services/storage/storage.service';
import { ChatModule } from './view/chat/chat.module';
import { IndexModule } from './view/index/index.module';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageCompiler,
      },
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    IndexModule,
    ChatModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    StorageService,
    RoomsProvider,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './locales/',
    `.json`
  );
}
