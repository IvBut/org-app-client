import { FormControl, FormGroup } from '@angular/forms';
import { ExtractFormControl, TNull, TNullableType } from '../../../core/models/types';

export interface IEducationModel {
  institution: FormControl<string>;
  degree: FormControl<string>;
  location: FormControl<string>;
  startYear: FormControl<TNull<Date>>;
  endYear: FormControl<TNull<Date>>;
  description: FormControl<string>;
}
export type TEducationModelData = Omit<
  ExtractFormControl<IEducationModel>,
  'startYear' | 'endYear'
> & { startYear: TNullableType<string> } & { endYear: TNullableType<string> };
export type TEducationDataForm = FormGroup<IEducationModel>;
