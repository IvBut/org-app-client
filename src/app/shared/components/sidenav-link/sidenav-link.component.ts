import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'cur-sidenav-link',
  templateUrl: './sidenav-link.component.html',
  styleUrls: ['./sidenav-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavLinkComponent {
  @Input()
  isOpen: boolean;

  @Input()
  routerLink?: string;

  @Input()
  routerLinkActiveOptions: { exact: boolean } = { exact: true };
}
