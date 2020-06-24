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
    const name = localStorage.getItem('chat-user-name');
    const id = localStorage.getItem('chat-user-id');

    if (id) {
      return { id, name };
    }
  }

  /**
   * Save user model to local storage
   */
  setUser(user: User): void {
    localStorage.setItem('chat-user-name', user.name);
    localStorage.setItem('chat-user-id', user.id);
  }
}
