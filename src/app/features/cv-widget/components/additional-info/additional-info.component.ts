import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ExtractFormControl, TNullableType } from '../../../../core/models/types';
import { moveItemInFormArray } from '../../../../core/utils/formUtils';
import { TCVWizardModel } from '../../model/cv.model';
import { TEducationModelData } from '../../model/education.model';
import { TLanguageGroupModelData } from '../../model/languages.model';
import { TLinkModelData } from '../../model/link.model';
import { TProfileModelData } from '../../model/profile.model';
import {
  ESectionId,
  SECTIONS_CONFIG,
  TSectionSettingsGroup,
  TSectionSettingsModelData
} from '../../model/section.model';
import { ESkillType, TISKillsGroupModelData } from '../../model/skill.model';
import { TWorkExpModelData } from '../../model/work-exp.model';
import {
  AttachToContainer,
  controlContainerProvider
} from '../attach-to-container/attach-to-container.directive';

@Component({
  selector: 'cur-additional-info',
  templateUrl: './additional-info.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  viewProviders: [controlContainerProvider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdditionalInfoComponent extends AttachToContainer implements OnInit {
  @Input({ required: true }) workExpControlKey = '';
  @Input({ required: true }) educationControlKey = '';
  @Input({ required: true }) skillsControlKey = '';
  @Input({ required: true }) profileControlKey = '';
  @Input({ required: true }) languagesControlKey = '';
  @Input({ required: true }) linksControlKey = '';

  @Input() initModel: ExtractFormControl<TCVWizardModel>;

  private _formBuilder = inject(FormBuilder);
  protected readonly ESectionId = ESectionId;

  get settingsList(): FormArray<TSectionSettingsGroup> {
    return this.childControl as FormArray<TSectionSettingsGroup>;
  }

  get settingsInitModel() {
    return (this.initModel?.sectionSettings?.length
      ? this.initModel.sectionSettings
      : []) as unknown as TSectionSettingsModelData[];
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

  get linksInitModel(): TLinkModelData[] {
    return (this.initModel?.links?.length
      ? this.initModel.links
      : []) as unknown as TLinkModelData[];
  }

  ngOnInit() {
    this.registerControl(
      this._formBuilder.array(
        this.settingsInitModel.length
          ? this.settingsInitModel.map(el => {
              return this._formBuilder.group({
                sectionId: [el.sectionId],
                sectionName: [el.sectionName],
                hideSection: [el.hideSection]
              });
            })
          : SECTIONS_CONFIG.map(conf => {
              return this._formBuilder.group({
                sectionId: [conf.sectionId as string],
                sectionName: [conf.sectionName()],
                hideSection: [conf.hideSection()]
              });
            })
      )
    );
  }

  drop(event: CdkDragDrop<any>) {
    moveItemInFormArray(this.settingsList, event.previousIndex, event.currentIndex);
    this.cdr.detectChanges();
  }
}
