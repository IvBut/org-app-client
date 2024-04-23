import { AsyncPipe, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SidenavLinkComponent } from './sidenav-link.component';
import { SidenavLinksComponent } from './sidenav-links/sidenav-links.component';

@NgModule({
  declarations: [SidenavLinkComponent, SidenavLinksComponent],
  exports: [SidenavLinkComponent, SidenavLinksComponent],
  imports: [RouterLinkActive, RouterLink, NgIf, MatIcon, NgForOf, AsyncPipe, NgTemplateOutlet]
})
export class SidenavLinkModule {}
