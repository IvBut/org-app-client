import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MODAL_DATA_INJECTION_TOKEN,
  TModalDataInjectionToken
} from '../../../../core/models/modal.model';
import { updateValueAndValidity } from '../../../../core/utils/formUtils';
import { IEducationModel } from '../../model/education.model';

type TModalData = FormGroup<IEducationModel>;
@Component({
  selector: 'cur-education-modal',
  templateUrl: './education-modal.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationModalComponent {
  private _formBuilder = inject(FormBuilder);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  modalData = inject<TModalDataInjectionToken>(MODAL_DATA_INJECTION_TOKEN);

  modalDataGroup = this._formBuilder.group<TModalData>({} as TModalData);

  handleCancel() {
    this.modalData.dialogRef.close();
  }

  handleSave() {
    updateValueAndValidity(this.modalDataGroup);
    this.cdr.markForCheck();
    if (this.modalDataGroup.status === 'VALID') {
      const group = this.modalDataGroup.get('educForm');
      this.modalData.dialogRef.close(group);
    }
  }
}
