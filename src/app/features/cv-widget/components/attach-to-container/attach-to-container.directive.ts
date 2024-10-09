import { ChangeDetectorRef, Directive, inject, Input } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup } from '@angular/forms';

export const controlContainerProvider = {
  provide: ControlContainer,
  useFactory: () => inject(ControlContainer, { skipSelf: true })
};

@Directive()
export abstract class AttachToContainer {
  @Input({ required: true }) controlKey = '';

  protected cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  protected parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  get childControl() {
    return this.parentFormGroup.get(this.controlKey);
  }

  registerControl(control: AbstractControl) {
    this.parentFormGroup.addControl(this.controlKey, control);
    this.cdr.markForCheck();
  }

  unRegisterControl() {
    if (this.parentFormGroup.contains(this.controlKey)) {
      this.parentFormGroup.removeControl(this.controlKey);
    }
  }
}
