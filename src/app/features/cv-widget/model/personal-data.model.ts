import { FormControl, FormGroup } from '@angular/forms';
import { TNull } from '../../../core/models/types';

export interface IPersonalDataModel {
  name: FormControl<string>;
  secondName: FormControl<string>;
  noMiddleName: FormControl<boolean>;
  middleName: FormControl<string>;
  birtDate: FormControl<TNull<Date>>;
  gender: FormControl<{ label: string; value: string }>;
  photo: FormControl<TNull<File>>;
  email: FormControl<string>;
  phone: FormControl<string>;
  country: FormControl<string>;
  city: FormControl<string>;
  address: FormControl<string>;
  postalCode: FormControl<string>;
}

export type TPersonalDataForm = FormGroup<IPersonalDataModel>;
