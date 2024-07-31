import { AsyncPipe, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatTooltip } from '@angular/material/tooltip';
import { IconSizeModule } from '../../directives/icon-size/icon-size/icon-size.module';
import { SidenavLinkComponent } from './sidenav-link.component';
import { SidenavLinksComponent } from './sidenav-links/sidenav-links.component';

@NgModule({
  declarations: [SidenavLinkComponent, SidenavLinksComponent],
  exports: [SidenavLinkComponent, SidenavLinksComponent],
  imports: [
    RouterLinkActive,
    RouterLink,
    NgIf,
    MatIcon,
    NgForOf,
    AsyncPipe,
    NgTemplateOutlet,
    IconSizeModule,
    MatTooltip
  ]
})
export class SidenavLinkModule {}
