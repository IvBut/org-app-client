import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EIconName } from '../../models/icon.model';
import { ETableBlockType, ITableBlockButtons } from '../../models/table-block.model';

const TITLE_BY_TYPE = {
  [ETableBlockType.EMPTY_DATA]: 'Нет данных',
  [ETableBlockType.ERROR]: 'Произошла ошибка',
  [ETableBlockType.FILTER]: 'Данные не найдены'
};

const ICON_BY_TYPE = {
  [ETableBlockType.EMPTY_DATA]: {
    svgIcon: EIconName.INFO,
    color: 'primary'
  },
  [ETableBlockType.ERROR]: {
    svgIcon: EIconName.ERROR,
    color: 'warn'
  },

  [ETableBlockType.FILTER]: {
    svgIcon: EIconName.FILTER_ALT_OFF,
    color: 'primary'
  }
};

@Component({
  selector: 'cur-table-block',
  templateUrl: './table-block.component.html',
  styleUrl: './table-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableBlockComponent {
  @Input() type?: ETableBlockType | keyof typeof ETableBlockType = ETableBlockType.EMPTY_DATA;
  @Input() title?: string = '';
  @Input() buttons?: ITableBlockButtons[] = [];
  @Output() buttonClick = new EventEmitter<string>();

  get innerTitle() {
    if (this.title) {
      return this.title;
    }
    return TITLE_BY_TYPE[this.type];
  }

  get icon() {
    return ICON_BY_TYPE[this.type];
  }

  trackByFn(_, item: ITableBlockButtons) {
    return item.id;
  }

  handleClick(btnId: string) {
    this.buttonClick.emit(btnId);
  }
}
