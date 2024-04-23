import { IsActiveMatchOptions } from '@angular/router';

export interface ISidenavLinkModel {
  icon?: string;
  routerLink: string;
  text: string;
  routerLinkActiveOptions?: { exact: boolean } | IsActiveMatchOptions;
  isBack?: boolean;
}
