import { FormControl, FormGroup } from '@angular/forms';
import { ExtractFormControl, TNullableType } from '../../../core/models/types';
import { TPickExpOption } from '../../../shared/models/pick-experience.model';

export interface ILanguageModel {
  language: FormControl<string>;
  level: FormControl<TNullableType<string>>;
}

export type TLanguageGroupModelData = ExtractFormControl<ILanguageModel>;
export type TLanguageDataForm = FormGroup<ILanguageModel>;

export enum ELanguageLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2'
}

export const LANG_OPTIONS: TPickExpOption[] = [
  {
    label: ELanguageLevel.A1,
    value: ELanguageLevel.A1
  },
  {
    label: ELanguageLevel.A2,
    value: ELanguageLevel.A2
  },
  {
    label: ELanguageLevel.B1,
    value: ELanguageLevel.B1
  },
  {
    label: ELanguageLevel.B2,
    value: ELanguageLevel.B2
  },
  {
    label: ELanguageLevel.C1,
    value: ELanguageLevel.C1
  },
  {
    label: ELanguageLevel.C2,
    value: ELanguageLevel.C2
  }
];
