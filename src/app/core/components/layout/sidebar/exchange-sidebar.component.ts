import { Component } from '@angular/core';

import { EIconName } from '../../../../shared/models/icon.model';
import { ISidenavLinkModel } from '../../../../shared/models/sidenav-link.model';

@Component({
  selector: 'cur-exchange-sidebar',
  template: ' <cur-sidenav-links [links]="CONFIG"></cur-sidenav-links> '
})
export class ExchangeSidebarComponent {
  protected readonly CONFIG: ISidenavLinkModel[] = [
    {
      routerLink: '/',
      text: 'На главную',
      routerLinkActiveOptions: { exact: true },
      isBack: true
    },
    {
      icon: EIconName.TODAY,
      routerLink: '/exchange/today',
      text: 'Сегодня'
    },
    {
      icon: EIconName.HISTORY,
      routerLink: '/exchange/history',
      text: 'История'
    }
  ];
}
