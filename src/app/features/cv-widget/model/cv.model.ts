import { FormArray, FormGroup } from '@angular/forms';
import { TEducationDataForm } from './education.model';
import { TPersonalDataForm } from './personal-data.model';
import { TWorkExpDataForm } from './work-exp.model';

export type TCVWizardModel = {
  personalData: TPersonalDataForm;
  workExperienceList: FormArray<TWorkExpDataForm>;
  educationList: FormArray<TEducationDataForm>;
};
export type TCVWizardModelGroup = FormGroup<TCVWizardModel>;
