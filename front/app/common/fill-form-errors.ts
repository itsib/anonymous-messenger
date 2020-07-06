import { AbstractControl, FormGroup } from '@angular/forms';
import { ApiError } from '@types';

export function fillFormErrors(form: FormGroup, error: ApiError): void {
  let errorsFilled = false;
  if (error.errors && error.errors.length) {
    error.errors.forEach(fieldError => {
      const control: AbstractControl = form.get(fieldError.param);
      if (control) {
        control.setErrors({api: {msg: fieldError.msg}});
        errorsFilled = true;
      }
    });
  }

  if (!errorsFilled) {
    form.setErrors({api: {msg: error.message}});
  }
}
