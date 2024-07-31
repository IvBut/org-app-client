import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';

import { SidebarService } from '../../../../core/components/layout/services/sidebarService';
import { EIconName } from '../../../models/icon.model';
import { ISidenavLinkModel } from '../../../models/sidenav-link.model';

@Component({
  selector: 'cur-sidenav-links',
  templateUrl: './sidenav-links.component.html',
  styleUrl: './sidenav-links.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavLinksComponent {
  sidebarService = inject(SidebarService);
  isOpen$ = this.sidebarService.isOpen;
  protected readonly EIconName = EIconName;

  @Input()
  links: ISidenavLinkModel[] = [];
}
