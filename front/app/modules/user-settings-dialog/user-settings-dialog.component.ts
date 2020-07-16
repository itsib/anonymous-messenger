import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiError, EditableFields, User } from '@types';
import { first } from 'rxjs/operators';
import { MAX_AVATAR_SIZE, SUPPORTED_FILES } from '../../../constants';
import { fillFormErrors } from '../../common/fill-form-errors';
import { UserProvider } from '../../providers/user/user.provider';

@Component({
  selector: 'app-user-settings-dialog',
  templateUrl: './user-settings-dialog.component.html',
  styleUrls: ['./user-settings-dialog.component.scss']
})
export class UserSettingsDialogComponent implements OnInit {

  user: User;

  form: FormGroup & {loading?: boolean};

  supportedFiles: string[];

  constructor(
    private userProvider: UserProvider,
    private dialogRef: MatDialogRef<UserSettingsDialogComponent>,
  ) {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      avatar: new FormControl(),
      newPassword: new FormControl(),
      oldPassword: new FormControl(),
    });

    this.supportedFiles = SUPPORTED_FILES;
  }

  /**
   * Component init handler
   */
  ngOnInit(): void {
    this.userProvider.getMe().pipe(first()).subscribe(user => {
      this.user = user;
      this.form.get('login').setValue(user.login);
      this.form.get('avatar').setValue(user.avatar);
    });
  }

  /**
   * User change avatar file
   */
  changeFile(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const files: FileList = input.files;
    const file: File = files[0];

    if (file) {
      const type = file.type.split('/')[1].toUpperCase();
      if (!this.supportedFiles.includes(type)) {
        this.form.get('avatar').setErrors({type: true});
        return;
      }

      const reader = new FileReader();
      reader.onload = (readerEvent) => {

        const image = new Image();
        image.onload = () => {

          // Resize the image
          const canvas = document.createElement('canvas');
          let width = image.width;
          let height = image.height;

          if (width > height) {
            if (width > MAX_AVATAR_SIZE) {
              height *= MAX_AVATAR_SIZE / width;
              width = MAX_AVATAR_SIZE;
            }
          } else {
            if (height > MAX_AVATAR_SIZE) {
              width *= MAX_AVATAR_SIZE / height;
              height = MAX_AVATAR_SIZE;
            }
          }
          canvas.width = width;
          canvas.height = height;

          canvas.getContext('2d').drawImage(image, 0, 0, width, height);
          this.form.get('avatar').setValue(canvas.toDataURL(file.type));
        };

        image.src = readerEvent.target.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Returns accept string (.png, .jpeg)
   */
  getSupportedFiles(): string {
    return this.supportedFiles.map(i => `.${i.toLowerCase()}`).join(', ');
  }

  /**
   * Save user profile
   */
  save(): void {
    if (this.form.invalid || this.form.loading) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.loading = true;

    const fields: EditableFields = {};

    if (this.form.get('login').value && this.form.get('login').value !== this.user.login) {
      fields.login = this.form.get('login').value;
    }
    if (this.form.get('avatar').value && this.form.get('avatar').value !== this.user.avatar) {
      fields.avatar = this.form.get('avatar').value;
    }

    if (!Object.keys(fields).length) {
      this.cancel();
      return;
    }

    this.userProvider.update(fields).subscribe(
      () => this.dialogRef.close(),
      (err: ApiError) => {
        fillFormErrors(this.form, err);
        this.form.loading = false;
      }
    );
  }

  /**
   * Cancel and close modal
   */
  cancel(): void {
    this.dialogRef.close();
  }
}
