import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EIconName } from '../../../../shared/models/icon.model';
import { ISidenavLinkModel } from '../../../../shared/models/sidenav-link.model';

@Component({
  selector: 'cur-main-sidebar',
  template: ' <cur-sidenav-links [links]="CONFIG"></cur-sidenav-links> ',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainSidebarComponent {
  protected readonly CONFIG: ISidenavLinkModel[] = [
    {
      icon: EIconName.HOME,
      routerLink: '/home',
      text: 'На главную'
    },
    {
      icon: EIconName.CURRENCY_EXCHANGE,
      routerLink: '/exchange',
      text: 'Курс валют'
    },
    {
      icon: EIconName.SETTINGS,
      routerLink: '/settings',
      text: 'Настройки'
    }
  ];
}
