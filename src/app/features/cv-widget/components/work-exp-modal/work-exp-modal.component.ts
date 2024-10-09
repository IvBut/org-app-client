import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MODAL_DATA_INJECTION_TOKEN,
  TModalDataInjectionToken
} from '../../../../core/models/modal.model';
import { updateValueAndValidity } from '../../../../core/utils/formUtils';
import { IWorkExpModel } from '../../model/work-exp.model';

type TModalData = FormGroup<IWorkExpModel>;
@Component({
  selector: 'cur-work-exp-modal',
  templateUrl: './work-exp-modal.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkExpModalComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  injectedData = inject<TModalDataInjectionToken>(MODAL_DATA_INJECTION_TOKEN);

  form: FormGroup;
  controlKey: string = 'expForm';

  ngOnInit(): void {
    this.form = this._formBuilder.group<TModalData>({} as TModalData);
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
