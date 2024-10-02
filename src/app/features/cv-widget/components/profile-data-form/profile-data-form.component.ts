import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { TNullableType } from '../../../../core/models/types';
import { DEFAULT_EDITOR_TOOLBAR } from '../../model/editor.configs';
import { ProfileModel, TProfileModelData } from '../../model/profile.model';

@Component({
  selector: 'cur-profile-data-form',
  templateUrl: './profile-data-form.component.html',
  styles: `
    :host {
      display: block;
    }
    .editor {
      width: 100%;
      height: 250px;
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
export class ProfileDataFormComponent implements OnInit, OnDestroy {
  @Input({ required: true }) controlKey = '';
  @Input() initModel: TNullableType<TProfileModelData>;

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  parentContainer = inject(ControlContainer);

  form: FormGroup<ProfileModel>;
  readonly descriptionConfig: any = {
    toolbar: DEFAULT_EDITOR_TOOLBAR
  };

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  ngOnInit() {
    this.form = new FormGroup<ProfileModel>({
      summary: new FormControl(this.initModel?.summary ?? '')
    });
    this.parentFormGroup.addControl(this.controlKey, this.form);
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }
}
