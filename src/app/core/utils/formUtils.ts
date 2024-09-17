import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export function updateValueAndValidity<T extends AbstractControl>(
  control: T,
  markAsTouched: boolean = true
): void {
  try {
    if (control instanceof FormGroup) {
      control.updateValueAndValidity();

      const controls = control.controls;
      Object.keys(controls).forEach(key => {
        updateValueAndValidity(control.get(key));
      });
    } else if (control instanceof FormArray) {
      control.updateValueAndValidity();

      control.controls.forEach(formControl => {
        updateValueAndValidity(formControl);
      });
    } else if (control instanceof FormControl) {
      markAsTouched && control.markAsTouched();
      control.updateValueAndValidity();
    } else {
      throw new Error('Error: unexpected control value');
    }
  } catch (error) {
    console.log(error);
  }
}
