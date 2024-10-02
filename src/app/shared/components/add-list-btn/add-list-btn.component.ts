import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EIconName, TIconSize } from '../../models/icon.model';

@Component({
  selector: 'cur-add-list-btn',
  templateUrl: './add-list-btn.component.html',
  styleUrl: './add-list-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddListBtnComponent {
  @Input() size?: TIconSize;
  @Output() clickAdd = new EventEmitter<any>();

  protected readonly EIconName = EIconName;

  handleAdd() {
    this.clickAdd.emit();
  }
}
