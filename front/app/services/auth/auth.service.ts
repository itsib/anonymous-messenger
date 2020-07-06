import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  protected _token: string;

  protected _isAuthenticatedStream$: BehaviorSubject<boolean>;

  constructor() {

    this._token = localStorage.getItem('chat-token');

    this._isAuthenticatedStream$ = new BehaviorSubject<boolean>(!!this._token);
  }

  /**
   * Create new user (log in)
   */
  login(token: string): void {
    localStorage.setItem('chat-token', token);
    this._token = token;
    this._isAuthenticatedStream$.next(true);
  }

  /**
   * Clear all user data
   */
  logout(): void {
    localStorage.removeItem('chat-token');
    this._token = null;
    this._isAuthenticatedStream$.next(false);
  }

  /**
   * Returns authenticated stream
   */
  isAuthenticatedStream(): Observable<boolean> {
    return this._isAuthenticatedStream$.asObservable();
  }

  /**
   * Check user authentication
   */
  isAuthenticated(): boolean {
    return !!this._token;
  }

  /**
   * Returns Bearer token
   */
  get token(): string {
    return this._token;
  }
}
