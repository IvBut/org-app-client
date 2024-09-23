import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
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
  styleUrl: './work-exp-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkExpModalComponent {
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
      const group = this.modalDataGroup.get('expForm');
      this.modalData.dialogRef.close(group);
    }
  }
}
