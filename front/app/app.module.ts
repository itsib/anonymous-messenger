import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RECAPTCHA_SETTINGS, RecaptchaModule } from 'ng-recaptcha';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AppInterceptor } from './common/app.interceptor';
import { TranslateMessageCompiler } from './common/translate-message-compiler';
import { RoomsProvider } from './providers/rooms/rooms.provider';
import { UserProvider } from './providers/user/user.provider';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { ForwardGuard } from './services/auth/forward.guard';
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
    AuthService,
    RoomsProvider,
    UserProvider,
    AuthGuard,
    ForwardGuard,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.reCaptchaKey,
        size: 'invisible',
        theme: 'dark'
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
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
