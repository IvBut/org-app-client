import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { updateValueAndValidity } from '../../../../core/utils/formUtils';
import { TCVWizardDataForm, TCVWizardModel } from '../../model/cv.model';
import { CvApiService, dataMock } from '../../services/cv-api.service';
import { createCvDTO } from '../../services/dto';

type TValidateFormName = keyof TCVWizardModel;
enum EWizardSteps {
  PERSONAL_DATA_STEP = 'PERSONAL_DATA_STEP',
  ADDITIONAL_DATA_STEP = 'ADDITIONAL_DATA_STEP'
}

@Component({
  selector: 'cur-create-cv-page',
  templateUrl: './create-cv-page.component.html',
  styleUrl: './create-cv-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCvPageComponent {
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _formBuilder = inject(FormBuilder);
  private cvApiService = inject(CvApiService);

  initModel: any = dataMock;

  cvWizardData: TCVWizardDataForm = this._formBuilder.group({}) as unknown as TCVWizardDataForm;

  validateStep(stepNames: TValidateFormName[]) {
    for (const item of stepNames) {
      const form = this.cvWizardData.controls[item];
      if (form) {
        updateValueAndValidity(form);
      }
    }
  }

  next(curStep: keyof typeof EWizardSteps) {
    switch (curStep) {
      case EWizardSteps.PERSONAL_DATA_STEP:
        this.validateStep(['personalData']);
        this.cdr.markForCheck();
        break;
      case EWizardSteps.ADDITIONAL_DATA_STEP:
        this.validateStep([
          'sectionSettings',
          'workExperienceList',
          'educationList',
          'sectionSettings',
          'skills',
          'profile',
          'languages',
          'links'
        ]);
        this.cdr.markForCheck();
        break;
    }
    if (this.cvWizardData.valid && curStep === EWizardSteps.ADDITIONAL_DATA_STEP) {
      this.cvApiService.previewCV(createCvDTO(this.cvWizardData)).subscribe({
        next: d => {
          console.log(d);
          window.open(d, 'window');
        },
        error: e => {
          console.log('>>>', e);
        }
      });
    }
  }
}
