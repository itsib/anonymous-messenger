import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserProvider } from '../../providers/user/user.provider';
import { AuthService } from '../../services/auth/auth.service';
import { UserSettingsDialogComponent } from '../user-settings-dialog/user-settings-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() open: boolean;

  @Output() openChange = new EventEmitter();

  constructor(
    public userProvider: UserProvider,
    public auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

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

  /**
   * To open user settings modal dialog
   */
  userSettings(): void {
    this.dialog.open(UserSettingsDialogComponent, {width: '450px'});
  }
}
