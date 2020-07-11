import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { MAX_AVATAR_SIZE, SUPPORTED_FILES } from '../../../constants';
import { UserProvider } from '../../providers/user/user.provider';

@Component({
  selector: 'app-user-settings-dialog',
  templateUrl: './user-settings-dialog.component.html',
  styleUrls: ['./user-settings-dialog.component.scss']
})
export class UserSettingsDialogComponent implements OnInit {

  image: string;

  form: FormGroup;

  constructor(
    private userProvider: UserProvider,
    private dialogRef: MatDialogRef<UserSettingsDialogComponent>,
  ) {
    this.form = new FormGroup({
      login: new FormControl(),
      avatar: new FormControl(),
      newPassword: new FormControl(),
      oldPassword: new FormControl(),
    });
  }

  /**
   * Component init handler
   */
  ngOnInit(): void {
    this.userProvider.getMe().pipe(first()).subscribe(user => {
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
      if (!SUPPORTED_FILES.includes(type)) {
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
          const dataUrl = canvas.toDataURL(file.type);
          this.form.get('avatar').setValue(dataUrl);
        };

        image.src = readerEvent.target.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   * Save user profile
   */
  save(): void {

  }

  /**
   * Cancel and close modal
   */
  cancel(): void {
    this.dialogRef.close();
  }
}
