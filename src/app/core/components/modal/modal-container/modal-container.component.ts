import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ComponentPortal, Portal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnInit,
  TemplateRef,
  inject
} from '@angular/core';
import { MODAL_DATA_INJECTION_TOKEN, TInjectedModalData } from '../../../models/modal.model';

@Component({
  selector: 'cur-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalContainerComponent implements OnInit {
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  dialogRef = inject<DialogRef<string>>(DialogRef<string>);
  data = inject<TInjectedModalData>(DIALOG_DATA);
  portal: Portal<any>;
  actionsTemplate: TemplateRef<any>;

  ngOnInit(): void {
    const modalData = this.data.modalData;
    const component = this.data.component;
    this.portal = new ComponentPortal(
      component,
      null,
      Injector.create({
        providers: [
          {
            provide: MODAL_DATA_INJECTION_TOKEN,
            useValue: { modalData, dialogRef: this.dialogRef, containerInstance: this }
          }
        ]
      })
    );
  }

  setActionsTemplate(templateRef: TemplateRef<any>) {
    this.actionsTemplate = templateRef;
    this.cdr.detectChanges();
  }

  handleClose() {
    this.dialogRef.close();
  }
}
