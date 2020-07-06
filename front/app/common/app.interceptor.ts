import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({providedIn: 'root'})
export class AppInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient, private auth: AuthService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Headers to add
    const headers = {};

    // Add auth token
    if (this.auth.isAuthenticated()) {
      headers['Authorization'] = `BEARER ${this.auth.token}`;
    }

    // Change headers
    headers['Content-Type'] = 'application/json; charset=utf-8';

    // Create new request
    return next.handle(request.clone({setHeaders: headers, body: request.body}))
      .pipe(
        // Logout if tokens was expired
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.auth.logout();
          }
          return throwError(err.error && err.error.message ? err.error : err);
        })
      );
  }
}
