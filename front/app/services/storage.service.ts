import { Injectable } from '@angular/core';
import { User } from '@types';

@Injectable({providedIn: 'root'})
export class StorageService {

  constructor() {
  }

  /**
   * Get saved user model
   */
  getUser(): User {
    const userJson = localStorage.getItem('chat-user');
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch (e) {}
    }
    return null;
  }

  /**
   * Save user model to local storage
   */
  setUser(user: User): void {
    localStorage.setItem('chat-user', JSON.stringify(user));
  }
}
