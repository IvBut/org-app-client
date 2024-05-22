import { IsActiveMatchOptions } from '@angular/router';
import { EIconName } from './icon.model';

export interface ISidenavLinkModel {
  icon?: EIconName;
  routerLink: string;
  text: string;
  routerLinkActiveOptions?: { exact: boolean } | IsActiveMatchOptions;
  isBack?: boolean;
}
