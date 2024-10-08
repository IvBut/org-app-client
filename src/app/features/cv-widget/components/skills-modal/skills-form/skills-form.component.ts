import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TNullableType } from '../../../../../core/models/types';
import { TPickExpOption } from '../../../../../shared/models/pick-experience.model';
import {
  ESkillType,
  ISkillModel,
  SKILLS_TYPE_MAP,
  SKILL_OPTIONS,
  TSkillModelData
} from '../../../model/skill.model';
import {
  AttachToContainer,
  controlContainerProvider
} from '../../attach-to-container/attach-to-container.directive';

export type TSkillFormGroup = Omit<ISkillModel, 'level'> & { type: FormControl<string> } & {
  level: FormControl<TPickExpOption>;
};

@Component({
  selector: 'cur-skills-form',
  templateUrl: './skills-form.component.html',
  viewProviders: [controlContainerProvider],
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsFormComponent extends AttachToContainer implements OnInit, OnDestroy {
  @Input() initModel?: TNullableType<TSkillModelData & { type: TNullableType<string> }>;

  protected readonly SKILL_OPTIONS = SKILL_OPTIONS;

  fg: FormGroup<TSkillFormGroup>;

  get types() {
    return [ESkillType.HARD, ESkillType.SOFT];
  }

  typeLabel = (type: string) => {
    return SKILLS_TYPE_MAP[type];
  };
  ngOnInit() {
    this.fg = new FormGroup<TSkillFormGroup>({
      name: new FormControl(this.initModel?.name ?? '', [Validators.required]),
      level: new FormControl(
        SKILL_OPTIONS.find(el => el.value === this?.initModel?.level) ?? null,
        [Validators.required]
      ),
      type: new FormControl(this.initModel?.type ?? null, [Validators.required])
    });
    this.registerControl(this.fg);
  }

  ngOnDestroy() {
    this.unRegisterControl();
  }
}
