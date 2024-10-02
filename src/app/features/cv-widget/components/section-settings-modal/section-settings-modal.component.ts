import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MODAL_DATA_INJECTION_TOKEN,
  TModalDataInjectionToken
} from '../../../../core/models/modal.model';
import { updateValueAndValidity } from '../../../../core/utils/formUtils';
import { ISectionSettings, TSectionSettingsData } from '../../model/section.model';

@Component({
  selector: 'cur-section-settings-modal',
  templateUrl: './section-settings-modal.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionSettingsModalComponent {
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _formBuilder = inject(FormBuilder);

  modalData = inject<TModalDataInjectionToken>(MODAL_DATA_INJECTION_TOKEN);
  initData: TSectionSettingsData = this.modalData.modalData;

  form: FormGroup<ISectionSettings> = this._formBuilder.group({
    sectionId: new FormControl(this.initData.sectionId),
    sectionName: new FormControl(this.initData.sectionName, [Validators.required]),
    hideSection: new FormControl(!!this.initData?.hideSection)
  });

  handleCancel() {
    this.modalData.dialogRef.close();
  }

  handleSave() {
    updateValueAndValidity(this.form);
    this.cdr.markForCheck();
    if (this.form.status === 'VALID') {
      this.modalData.dialogRef.close(this.form.value);
    }
  }
}
