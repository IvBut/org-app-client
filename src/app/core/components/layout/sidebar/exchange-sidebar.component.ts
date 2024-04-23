import { Component } from '@angular/core';

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
      icon: 'today',
      routerLink: '/exchange/today',
      text: 'Сегодня'
    },
    {
      icon: 'timeline',
      routerLink: '/exchange/history',
      text: 'История'
    },
    {
      routerLink: '/exchange/history1',
      text: 'История1'
    }
  ];
}
