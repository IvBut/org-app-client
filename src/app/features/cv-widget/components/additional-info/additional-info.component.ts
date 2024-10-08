import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ExtractFormControl, TNullableType } from '../../../../core/models/types';
import { TCVWizardModel } from '../../model/cv.model';
import { TEducationModelData } from '../../model/education.model';
import { TLanguageGroupModelData } from '../../model/languages.model';
import { TProfileModelData } from '../../model/profile.model';
import { ESectionId, ISectionSettings, TSectionSettingsGroup } from '../../model/section.model';
import { ESkillType, TISKillsGroupModelData } from '../../model/skill.model';
import { TWorkExpModelData } from '../../model/work-exp.model';

@Component({
  selector: 'cur-additional-info',
  templateUrl: './additional-info.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdditionalInfoComponent implements OnInit, OnDestroy {
  @Input({ required: true }) settingsControlKey = '';
  @Input({ required: true }) workExpControlKey = '';
  @Input({ required: true }) educationControlKey = '';
  @Input({ required: true }) skillsControlKey = '';
  @Input({ required: true }) profileControlKey = '';
  @Input({ required: true }) languagesControlKey = '';

  @Input() initModel: ExtractFormControl<TCVWizardModel>;

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _formBuilder = inject(FormBuilder);
  protected readonly ESectionId = ESectionId;
  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  get settingsList(): FormArray<TSectionSettingsGroup> {
    return this.parentFormGroup.get(this.settingsControlKey) as FormArray<TSectionSettingsGroup>;
  }

  get worksInitModel(): TWorkExpModelData[] {
    return (this.initModel?.workExperienceList?.length
      ? this.initModel.workExperienceList
      : []) as unknown as TWorkExpModelData[];
  }

  get educationsInitModel(): TEducationModelData[] {
    return (this.initModel?.educationList?.length
      ? this.initModel.educationList
      : []) as unknown as TEducationModelData[];
  }

  get skillsInitModel(): TISKillsGroupModelData[] {
    return (this.initModel?.skills || [
      { type: ESkillType.HARD, data: [] },
      { type: ESkillType.SOFT, data: [] }
    ]) as unknown as TISKillsGroupModelData[];
  }

  get languagesInitModel(): TLanguageGroupModelData[] {
    return (this.initModel?.languages?.length
      ? this.initModel.languages
      : []) as unknown as TLanguageGroupModelData[];
  }

  get profileInitModel(): TNullableType<TProfileModelData> {
    return (this.initModel?.profile || null) as unknown as TProfileModelData;
  }

  ngOnInit() {
    this.parentFormGroup.addControl(
      this.settingsControlKey,
      this._formBuilder.array([
        new FormGroup<ISectionSettings>({
          sectionId: new FormControl(ESectionId.WORK_EXPERIENCE),
          sectionName: new FormControl('Опыт работы'),
          hideSection: new FormControl(false)
        }),
        new FormGroup<ISectionSettings>({
          sectionId: new FormControl(ESectionId.EDUCATION),
          sectionName: new FormControl('Образование'),
          hideSection: new FormControl(false)
        }),
        new FormGroup<ISectionSettings>({
          sectionId: new FormControl(ESectionId.SKILLS),
          sectionName: new FormControl('Навыки'),
          hideSection: new FormControl(false)
        }),
        new FormGroup<ISectionSettings>({
          sectionId: new FormControl(ESectionId.LANGUAGES),
          sectionName: new FormControl('Языки'),
          hideSection: new FormControl(false)
        }),
        new FormGroup<ISectionSettings>({
          sectionId: new FormControl(ESectionId.PROFILE),
          sectionName: new FormControl('Профиль'),
          hideSection: new FormControl(false)
        })
      ])
    );
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.settingsControlKey);
  }
}
