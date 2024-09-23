import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EIconName } from '../../../../shared/models/icon.model';

@Component({
  selector: 'cur-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrl: './modal-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalHeaderComponent {
  protected readonly EIconName = EIconName;

  @Input() hasCloseIcon?: boolean = true;
  @Output() closeModal? = new EventEmitter();

  handleClose() {
    this.closeModal.emit();
  }
}
