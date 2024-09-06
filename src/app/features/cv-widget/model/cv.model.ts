import { FormGroup } from '@angular/forms';
import { TPersonalDataForm } from './personal-data.model';

export type TCVWizardModel = {
  personalData: TPersonalDataForm;
};
export type TCVWizardModelGroup = FormGroup<TCVWizardModel>;
