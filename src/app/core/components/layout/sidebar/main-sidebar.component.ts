import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ISidenavLinkModel } from '../../../../shared/models/sidenav-link.model';

@Component({
  selector: 'cur-main-sidebar',
  template: ' <cur-sidenav-links [links]="CONFIG"></cur-sidenav-links> ',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainSidebarComponent {
  protected readonly CONFIG: ISidenavLinkModel[] = [
    {
      icon: 'home',
      routerLink: '/home',
      text: 'На главную'
    },
    {
      icon: 'currency_exchange',
      routerLink: '/exchange',
      text: 'Курс валют'
    },
    {
      icon: 'settings',
      routerLink: '/settings',
      text: 'Настройки'
    }
  ];
}
