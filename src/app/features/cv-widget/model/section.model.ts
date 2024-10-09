import { FormControl, FormGroup } from '@angular/forms';
import { ExtractFormControl } from '../../../core/models/types';

export interface ISectionSettings {
  sectionId: FormControl<string>;
  sectionName: FormControl<string>;
  hideSection: FormControl<boolean>;
}

export type TSectionSettingsGroup = FormGroup<ISectionSettings>;

export type TSectionSettingsData = ExtractFormControl<ISectionSettings>;

export enum ESectionId {
  SKILLS = 'SKILLS',
  PROFILE = 'PROFILE',
  EDUCATION = 'EDUCATION',
  WORK_EXPERIENCE = 'WORK_EXPERIENCE',
  LANGUAGES = 'LANGUAGES',
  LINKS = 'LINKS'
}
