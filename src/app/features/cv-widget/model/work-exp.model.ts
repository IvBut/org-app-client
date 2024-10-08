import { FormControl, FormGroup } from '@angular/forms';
import { ExtractFormControl, TNull } from '../../../core/models/types';

export interface IWorkExpModel {
  company: FormControl<string>;
  location: FormControl<string>;
  jobPosition: FormControl<string>;
  startDate: FormControl<TNull<Date>>;
  endDate: FormControl<TNull<Date>>;
  description: FormControl<string>;
  stillWorking: FormControl<boolean>;
}

export type TWorkExpModelData = ExtractFormControl<IWorkExpModel>;
export type TWorkExpDataForm = FormGroup<IWorkExpModel>;
