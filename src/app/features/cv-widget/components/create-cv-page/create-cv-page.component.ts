import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { downloadFileBlob, getFileNameFromHeader } from '../../../../core/utils/fileUtils';
import { updateValueAndValidity } from '../../../../core/utils/formUtils';
import { TCVWizardDataForm, TCVWizardModel } from '../../model/cv.model';
import { CvApiService, dataMock } from '../../services/cv-api.service';
import { createCvDTO } from '../../services/dto';

type TValidateFormName = keyof TCVWizardModel;
enum EWizardSteps {
  PERSONAL_DATA_STEP = 'PERSONAL_DATA_STEP',
  ADDITIONAL_DATA_STEP = 'ADDITIONAL_DATA_STEP',
  SUCCESS = 'SUCCESS'
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

  fileId: string = '';

  initModel: any = dataMock;

  cvWizardData: TCVWizardDataForm = this._formBuilder.group({}) as unknown as TCVWizardDataForm;

  validateStep(stepNames: TValidateFormName[]): boolean {
    const valid = [];
    for (const item of stepNames) {
      const form = this.cvWizardData.controls[item];
      if (form) {
        updateValueAndValidity(form);
        valid.push(!!form?.valid);
      }
    }
    return valid.every(el => !!el);
  }

  handlePersonalStep(stepper: MatStepper) {
    const valid = this.validateStep(['personalData']);
    this.cdr.markForCheck();
    if (valid) {
      stepper.next();
    }
  }

  handleAdditionalStep(stepper: MatStepper) {
    const valid = this.validateStep([
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
    if (valid) {
      this.cvApiService.createCV(createCvDTO(this.cvWizardData)).subscribe({
        next: resp => {
          this.fileId = resp.fileId;
          this.cdr.markForCheck();
          stepper.next();
        },
        error: e => {
          console.log('>>>', e);
        }
      });
    }
  }

  next(curStep: keyof typeof EWizardSteps, stepper: MatStepper) {
    switch (curStep) {
      case EWizardSteps.PERSONAL_DATA_STEP:
        this.handlePersonalStep(stepper);
        break;
      case EWizardSteps.ADDITIONAL_DATA_STEP:
        this.handleAdditionalStep(stepper);
        break;
    }
  }

  download() {
    this.cvApiService.download(this.fileId).subscribe(resp => {
      const fileName = getFileNameFromHeader(resp.headers) || 'cv.pdf';
      downloadFileBlob(resp.body, fileName);
    });
  }
}
