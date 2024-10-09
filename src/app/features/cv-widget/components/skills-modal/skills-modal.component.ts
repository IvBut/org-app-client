import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MODAL_DATA_INJECTION_TOKEN,
  TModalDataInjectionToken
} from '../../../../core/models/modal.model';
import { updateValueAndValidity } from '../../../../core/utils/formUtils';

@Component({
  selector: 'cur-skills-modal',
  templateUrl: './skills-modal.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsModalComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  injectedData = inject<TModalDataInjectionToken>(MODAL_DATA_INJECTION_TOKEN);

  form = this._formBuilder.group<any>({});
  controlKey: string = 'skillForm';

  ngOnInit(): void {
    this.form = this._formBuilder.group({});
  }
  handleCancel() {
    this.injectedData.dialogRef.close();
  }

  handleSave() {
    updateValueAndValidity(this.form);
    this.cdr.markForCheck();
    if (this.form.status === 'VALID') {
      const group = this.form.get(this.controlKey);
      this.injectedData.dialogRef.close(group.getRawValue());
    }
  }
}
