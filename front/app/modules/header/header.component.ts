import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() open: boolean;

  @Output() openChange = new EventEmitter();

  constructor(public auth: AuthService, private router: Router) { }

  /**
   * Hamburger click handler
   */
  hamburger(): void {
    this.open = !this.open;
    this.openChange.emit(this.open);
  }

  /**
   * Logout from the room
   */
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
