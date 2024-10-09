import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TNullableType } from '../../../../core/models/types';
import { DEFAULT_EDITOR_TOOLBAR } from '../../model/editor.configs';
import { ProfileModel, TProfileModelData } from '../../model/profile.model';
import {
  AttachToContainer,
  controlContainerProvider
} from '../attach-to-container/attach-to-container.directive';

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
  viewProviders: [controlContainerProvider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileDataFormComponent extends AttachToContainer implements OnInit {
  @Input() initModel: TNullableType<TProfileModelData>;

  form: FormGroup<ProfileModel>;
  readonly descriptionConfig: any = {
    toolbar: DEFAULT_EDITOR_TOOLBAR
  };

  ngOnInit() {
    this.form = new FormGroup<ProfileModel>({
      summary: new FormControl(this.initModel?.summary ?? '')
    });
    this.registerControl(this.form);
  }
}
