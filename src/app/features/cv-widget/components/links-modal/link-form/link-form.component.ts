import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TNullableType } from '../../../../../core/models/types';
import { ILinkModel, TLinkModelData } from '../../../model/link.model';
import {
  AttachToContainer,
  controlContainerProvider
} from '../../attach-to-container/attach-to-container.directive';

@Component({
  selector: 'cur-link-form',
  templateUrl: './link-form.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  viewProviders: [controlContainerProvider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkFormComponent extends AttachToContainer implements OnInit, OnDestroy {
  @Input() initModel?: TNullableType<TLinkModelData>;

  fg: FormGroup<ILinkModel>;

  ngOnInit() {
    this.fg = new FormGroup<ILinkModel>({
      label: new FormControl(this.initModel?.label ?? '', [Validators.required]),
      link: new FormControl(this.initModel?.link ?? '', [Validators.required])
    });
    this.registerControl(this.fg);
  }

  ngOnDestroy() {
    this.unRegisterControl();
  }
}
