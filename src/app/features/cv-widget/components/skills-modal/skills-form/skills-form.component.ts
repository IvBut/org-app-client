import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { TNullableType } from '../../../../../core/models/types';
import { TPickExpOption } from '../../../../../shared/models/pick-experience.model';
import {
  ESkillType,
  ISkillModel,
  SKILL_OPTIONS,
  SKILLS_TYPE_MAP,
  TSkillModelData
} from '../../../model/skill.model';

export type TSkillFormGroup = Omit<ISkillModel, 'level'> & { type: FormControl<string> } & {
  level: FormControl<TPickExpOption>;
};

@Component({
  selector: 'cur-skills-form',
  templateUrl: './skills-form.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ],
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsFormComponent implements OnInit, OnDestroy {
  @Input() initModel?: TNullableType<TSkillModelData & { type: TNullableType<string> }>;
  @Input({ required: true }) controlKey = '';

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  protected readonly SKILL_OPTIONS = SKILL_OPTIONS;

  parentContainer = inject(ControlContainer);
  fg: FormGroup<TSkillFormGroup>;

  get types() {
    return [ESkillType.HARD, ESkillType.SOFT];
  }

  typeLabel = (type: string) => {
    return SKILLS_TYPE_MAP[type];
  };
  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    this.fg = new FormGroup<TSkillFormGroup>({
      name: new FormControl(this.initModel?.name ?? '', [Validators.required]),
      level: new FormControl(
        SKILL_OPTIONS.find(el => el.value === this?.initModel?.level) ?? null,
        [Validators.required]
      ),
      type: new FormControl(this.initModel?.type ?? null, [Validators.required])
    });
    this.parentFormGroup.addControl(this.controlKey, this.fg);
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }
}
