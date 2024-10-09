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

@Component({
  selector: 'cur-links-modal',
  templateUrl: './links-modal.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinksModalComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  injectedData = inject<TModalDataInjectionToken>(MODAL_DATA_INJECTION_TOKEN);

  form: FormGroup;
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
