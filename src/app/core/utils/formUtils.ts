import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export function updateValueAndValidity<T extends AbstractControl>(
  control: T,
  markAsTouched: boolean = true,
  updateValue: boolean = false
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
      if (markAsTouched) {
        control.markAsTouched();
      }
      if (updateValue) {
        control.updateValueAndValidity();
      }
    } else {
      throw new Error('Error: unexpected control value');
    }
  } catch (error) {
    console.log(error);
  }
}

export function moveItemInFormArray(
  formArray: FormArray,
  fromIndex: number,
  toIndex: number
): void {
  const dir = toIndex > fromIndex ? 1 : -1;

  const item = formArray.at(fromIndex);
  for (let i = fromIndex; i * dir < toIndex * dir; i = i + dir) {
    const current = formArray.at(i + dir);
    formArray.setControl(i, current);
  }
  formArray.setControl(toIndex, item);
}
