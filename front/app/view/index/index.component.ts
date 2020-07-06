import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from '@types';
import { RecaptchaComponent } from 'ng-recaptcha';
import { UserProvider } from '../../providers/user/user.provider';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  form: FormGroup & {loading?: boolean};

  activeForm: 'login' | 'register';
  // Get re captcha
  @ViewChild('captchaRef', {static: true}) reCaptcha: RecaptchaComponent;

  constructor(
    private auth: AuthService,
    private userProvider: UserProvider,
    private router: Router
  ) {
    this.activeForm = 'login';

    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Switch active form
   */
  setActiveForm(): void {
    if (this.form.loading) {
      return;
    }
    this.form.reset();
    this.reCaptcha.reset();

    this.activeForm = this.activeForm === 'login' ? 'register' : 'login';
  }

  /**
   * Login user
   */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.loading = true;

    this.reCaptcha.execute();
  }

  /**
   * Re-captcha resolved
   */
  resolved(code: string): void {
    const credentials: Credentials = this.form.value;
    credentials.reCaptcha = code;

    (this.activeForm === 'login' ? this.userProvider.login(credentials) : this.userProvider.register(credentials))
      .subscribe(
        ({ token }) => {
          debugger;
        },
        err => {
          debugger;
        }
      );
  }
}
