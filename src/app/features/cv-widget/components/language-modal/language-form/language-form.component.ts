import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TNullableType } from '../../../../../core/models/types';
import { TPickExpOption } from '../../../../../shared/models/pick-experience.model';
import {
  ILanguageModel,
  LANG_OPTIONS,
  TLanguageGroupModelData
} from '../../../model/languages.model';
import {
  AttachToContainer,
  controlContainerProvider
} from '../../attach-to-container/attach-to-container.directive';

export type TLangFormGroup = Omit<ILanguageModel, 'level'> & {
  level: FormControl<TPickExpOption>;
};
@Component({
  selector: 'cur-language-form',
  templateUrl: './language-form.component.html',
  viewProviders: [controlContainerProvider],
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageFormComponent extends AttachToContainer implements OnInit, OnDestroy {
  @Input() initModel: TNullableType<TLanguageGroupModelData>;

  fg: FormGroup<TLangFormGroup>;
  protected readonly LANG_OPTIONS = LANG_OPTIONS;
  ngOnInit() {
    this.fg = new FormGroup({
      level: new FormControl(LANG_OPTIONS.find(el => el.value === this?.initModel?.level) ?? null, [
        Validators.required
      ]),
      language: new FormControl(this.initModel?.language ?? '', [Validators.required])
    });
    this.registerControl(this.fg);
  }

  ngOnDestroy() {
    this.unRegisterControl();
  }
}
