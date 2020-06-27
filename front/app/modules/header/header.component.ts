import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() open: boolean;

  @Output() openChange = new EventEmitter();

  constructor(public storage: StorageService) { }

  /**
   * Hamburger click handler
   */
  hamburger(): void {
    this.open = !this.open;
    this.openChange.emit(this.open);
  }
}
