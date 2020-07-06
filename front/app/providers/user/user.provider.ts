import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '@types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserProvider {

  constructor(private http: HttpClient) {
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
}
