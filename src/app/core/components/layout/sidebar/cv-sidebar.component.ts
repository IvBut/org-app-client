import { Component } from '@angular/core';

import { EIconName } from '../../../../shared/models/icon.model';
import { ISidenavLinkModel } from '../../../../shared/models/sidenav-link.model';

@Component({
  selector: 'cur-cv-sidebar',
  template: ' <cur-sidenav-links [links]="CONFIG"></cur-sidenav-links> '
})
export class CvSidebarComponent {
  protected readonly CONFIG: ISidenavLinkModel[] = [
    {
      routerLink: '/',
      text: 'На главную',
      routerLinkActiveOptions: { exact: true },
      isBack: true
    },
    {
      icon: EIconName.ADD,
      routerLink: '/cv/create',
      text: 'Создать резюме'
    }
  ];
}
