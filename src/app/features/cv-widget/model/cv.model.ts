import { FormArray, FormGroup } from '@angular/forms';
import { TEducationDataForm } from './education.model';
import { TPersonalDataForm } from './personal-data.model';
import { TProfileDataForm } from './profile.model';
import { TSectionSettingsGroup } from './section.model';
import { TSkillsDataForm } from './skill.model';
import { TWorkExpDataForm } from './work-exp.model';

export type TCVWizardModel = {
  personalData: TPersonalDataForm;
  workExperienceList: FormArray<TWorkExpDataForm>;
  educationList: FormArray<TEducationDataForm>;
  sectionSettings: FormArray<TSectionSettingsGroup>;
  skills: FormArray<TSkillsDataForm>;
  profile: TProfileDataForm;
};
export type TCVWizardModelGroup = FormGroup<TCVWizardModel>;
