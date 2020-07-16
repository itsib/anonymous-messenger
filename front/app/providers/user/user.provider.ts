import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials, EditableFields, User } from '@types';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class UserProvider {

  _user$: BehaviorSubject<User>;

  constructor(private http: HttpClient, private auth: AuthService) {
    this._user$ = new BehaviorSubject<User>(null);

    this.auth.isAuthenticatedStream()
      .pipe(
        switchMap((loggedIn) => loggedIn ? this.http.get<User>('/api/auth/me') : of(null)),
      )
      .subscribe(user => this._user$.next(user));
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
    return this._user$.asObservable();
  }

  /**
   * Update user
   */
  update(params: EditableFields): Observable<User> {
    return this.http.patch<User>('/api/auth/me', params).pipe(tap(user => this._user$.next(user)));
  }
}
