import { FormControl, FormGroup } from '@angular/forms';
import { ExtractFormControl } from '../../../core/models/types';

export interface ProfileModel {
  summary: FormControl<string>;
}

export type TProfileModelData = ExtractFormControl<ProfileModel>;
export type TProfileDataForm = FormGroup<ProfileModel>;
