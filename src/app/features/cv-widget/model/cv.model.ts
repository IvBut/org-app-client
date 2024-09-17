import { FormArray, FormGroup } from '@angular/forms';
import { TPersonalDataForm } from './personal-data.model';
import { TWorkExpDataForm } from './work-exp.model';

export type TCVWizardModel = {
  personalData: TPersonalDataForm;
  workExperienceList: FormArray<TWorkExpDataForm>;
};
export type TCVWizardModelGroup = FormGroup<TCVWizardModel>;
