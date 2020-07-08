import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials, User } from '@types';
import { Observable, of } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class UserProvider {

  _user$: Observable<User>;

  constructor(private http: HttpClient, private auth: AuthService) {
    this._user$ = this.auth.isAuthenticatedStream().pipe(
      switchMap((loggedIn) => loggedIn ? this.http.get<User>('/api/auth/me') : of(null)),
      shareReplay()
    );
  }

  /**
   * Login user
   */
  login(credentials: Credentials): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', credentials);
  }

  /**
   * Register new user
   */
  register(credentials: Credentials): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/register', credentials);
  }

  /**
   * Get current user
   */
  getMe(): Observable<User> {
    return this._user$;
  }
}
