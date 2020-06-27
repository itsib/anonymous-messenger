import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 } from 'uuid';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  form: FormGroup;

  constructor(
    private storage: StorageService,
    private router: Router
  ) {

    const user = this.storage.getUser();

    this.form = new FormGroup({
      id: new FormControl(user ? user.id : v4()),
      name: new FormControl(user && user.name, Validators.required)
    });
  }

  /**
   * Submit form
   */
  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.storage.setUser(this.form.value);
    this.router.navigate(['/chat']);
  }
}
