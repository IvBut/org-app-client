import { Directive, HostBinding, Input } from '@angular/core';
import { EIconSize, TIconSize } from '../../../models/icon.model';

@Directive({
  selector: 'mat-icon[curIconSize]',
  standalone: false
})
export class IconSizeDirective {
  @Input() curIconSize: TIconSize = EIconSize.Medium;

  @HostBinding('class.icon-size--xxsmall')
  get isXXSmall() {
    return this.curIconSize === EIconSize.XXSmall;
  }

  @HostBinding('class.icon-size--xsmall')
  get isXSmall() {
    return this.curIconSize === EIconSize.XSmall;
  }

  @HostBinding('class.icon-size--small')
  get isSmall() {
    return this.curIconSize === EIconSize.Small;
  }

  @HostBinding('class.icon-size--medium')
  get isMedium() {
    return this.curIconSize === EIconSize.Medium;
  }

  @HostBinding('class.icon-size--large')
  get isLarge() {
    return this.curIconSize === EIconSize.Large;
  }

  @HostBinding('class.icon-size--xlarge')
  get isXLarge() {
    return this.curIconSize === EIconSize.XLarge;
  }

  @HostBinding('class.icon-size--xxlarge')
  get isXXLarge() {
    return this.curIconSize === EIconSize.XXLarge;
  }

  @HostBinding('class.icon-size--xxxlarge')
  get isXXXLarge() {
    return this.curIconSize === EIconSize.XXXLarge;
  }
}
