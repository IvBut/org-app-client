import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cur-modal-actions',
  template: '<ng-content></ng-content>',
  styleUrl: './modal-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalActionsComponent {}
