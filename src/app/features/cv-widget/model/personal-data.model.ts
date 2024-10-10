import { FormControl, FormGroup } from '@angular/forms';
import { ExtractFormControl, TNull, TNullableType } from '../../../core/models/types';

export interface IPersonalModel {
  name: FormControl<string>;
  secondName: FormControl<string>;
  noMiddleName: FormControl<boolean>;
  middleName: FormControl<string>;
  birtDate: FormControl<TNull<Date>>;
  gender: FormControl<string>;
  photo: FormControl<TNull<File>>;
  email: FormControl<string>;
  phone: FormControl<string>;
  country: FormControl<string>;
  city: FormControl<string>;
  address: FormControl<string>;
  postalCode: FormControl<string>;
}
export type TPersonalModelData = Omit<ExtractFormControl<IPersonalModel>, 'birtDate'> & {
  birtDate: TNullableType<string>;
};
export type TPersonalDataForm = FormGroup<IPersonalModel>;

export enum EPersonalDataGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NOT_SPECIFY = 'NOT_SPECIFY'
}

export const GENDER_OPTIONS = [
  { label: 'Не указывать', value: EPersonalDataGender.NOT_SPECIFY },
  { label: 'Mужской', value: EPersonalDataGender.MALE },
  { label: 'Женский', value: EPersonalDataGender.FEMALE }
];
