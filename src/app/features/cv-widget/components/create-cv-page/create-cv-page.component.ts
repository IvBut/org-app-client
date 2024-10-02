import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { updateValueAndValidity } from '../../../../core/utils/formUtils';
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

  validateStep(stepNames: TValidateFormName[]) {
    for (const item of stepNames) {
      const form = this.cvWizardData.controls[item];
      if (form) {
        updateValueAndValidity(form);
      }
    }
  }

  next(stepNames: TValidateFormName[]) {
    this.validateStep(stepNames);
    this.cdr.markForCheck();
  }
}
