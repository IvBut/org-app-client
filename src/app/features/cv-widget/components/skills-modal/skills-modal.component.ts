import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
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
export class SkillsModalComponent {
  private _formBuilder = inject(FormBuilder);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  modalData = inject<TModalDataInjectionToken>(MODAL_DATA_INJECTION_TOKEN);

  modalDataGroup = this._formBuilder.group<any>({});

  handleCancel() {
    this.modalData.dialogRef.close();
  }

  handleSave() {
    updateValueAndValidity(this.modalDataGroup);
    this.cdr.markForCheck();
    if (this.modalDataGroup.status === 'VALID') {
      const group = this.modalDataGroup.get('skillForm');
      this.modalData.dialogRef.close(group.value);
    }
  }
}
