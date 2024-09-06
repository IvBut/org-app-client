import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TCVWizardModel, TCVWizardModelGroup } from '../../model/cv.model';

type TValidateFormName = keyof TCVWizardModel;
@Component({
  selector: 'cur-create-cv-page',
  templateUrl: './create-cv-page.component.html',
  styleUrl: './create-cv-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCvPageComponent {
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _formBuilder = inject(FormBuilder);
  cvWizardData: TCVWizardModelGroup = this._formBuilder.group({}) as unknown as TCVWizardModelGroup;

  validateStep(stepName: TValidateFormName, ignoreControls: string[] = []) {
    const form = this.cvWizardData.controls[stepName];
    Object.keys(form.controls).forEach(key => {
      if (ignoreControls.indexOf(key) == -1) {
        const control = form.get(key);
        control.updateValueAndValidity();
      }
    });
  }

  next(stepName: TValidateFormName) {
    this.validateStep(stepName);
    this.cdr.markForCheck();
  }
}
