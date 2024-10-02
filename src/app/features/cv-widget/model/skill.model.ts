import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { ExtractFormControl, TNullableType } from '../../../core/models/types';
import { TPickExpOption } from '../../../shared/models/pick-experience.model';

export enum ESkillType {
  HARD = 'HARD',
  SOFT = 'SOFT'
}

export interface ISkillModel {
  name: FormControl<string>;
  level: FormControl<TNullableType<string>>;
}

export type TSkillModelData = ExtractFormControl<ISkillModel>;
export interface ISKillsGroupModel {
  data: FormArray<FormGroup<ISkillModel>>;
  type: FormControl<string>;
}
export type TISKillsGroupModelData = ExtractFormControl<ISKillsGroupModel>;

export type TSkillsDataForm = FormGroup<ISKillsGroupModel>;

export const SKILLS_TYPE_MAP = {
  [ESkillType.HARD]: 'Хард скилы',
  [ESkillType.SOFT]: 'Софт скилы'
};
export const SKILL_OPTIONS: TPickExpOption[] = [
  {
    label: 'Novice',
    value: 'Novice'
  },
  {
    label: 'Beginner',
    value: 'Beginner'
  },
  {
    label: 'Skillful',
    value: 'Skillful'
  },
  {
    label: 'Experienced',
    value: 'Experienced'
  },
  {
    label: 'Advanced',
    value: 'Advanced'
  },
  {
    label: 'Expert',
    value: 'Expert'
  }
];
