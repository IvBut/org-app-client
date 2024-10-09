import { FormControl, FormGroup } from '@angular/forms';
import { ExtractFormControl } from '../../../core/models/types';

export interface ISectionSettings {
  sectionId: FormControl<string>;
  sectionName: FormControl<string>;
  hideSection: FormControl<boolean>;
}

export type TSectionSettingsGroup = FormGroup<ISectionSettings>;

export type TSectionSettingsModelData = ExtractFormControl<ISectionSettings>;

export enum ESectionId {
  SKILLS = 'SKILLS',
  PROFILE = 'PROFILE',
  EDUCATION = 'EDUCATION',
  WORK_EXPERIENCE = 'WORK_EXPERIENCE',
  LANGUAGES = 'LANGUAGES',
  LINKS = 'LINKS'
}

export const SECTIONS_CONFIG = [
  {
    sectionId: ESectionId.WORK_EXPERIENCE,
    sectionName: () => 'Опыт работы',
    hideSection: () => false
  },
  {
    sectionId: ESectionId.EDUCATION,
    sectionName: () => 'Образование',
    hideSection: () => false
  },
  {
    sectionId: ESectionId.SKILLS,
    sectionName: () => 'Навыки',
    hideSection: () => false
  },
  {
    sectionId: ESectionId.LANGUAGES,
    sectionName: () => 'Языки',
    hideSection: () => false
  },
  {
    sectionId: ESectionId.LINKS,
    sectionName: () => 'Социальные сети',
    hideSection: () => false
  },
  {
    sectionId: ESectionId.PROFILE,
    sectionName: () => 'Профиль',
    hideSection: () => false
  }
];
