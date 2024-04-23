import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SidenavLinkModule } from '../../../shared/components/sidenav-link/sidenav-link.module';
import { ThemeSwitcherModule } from '../../../shared/components/theme-switcher/theme-switcher.module';
import { SidenavContentAreaDirective } from './directive/sidenav-content-area.directive';
import { SidebarService } from './services/sidebarService';
import { ExchangeSidebarComponent } from './sidebar/exchange-sidebar.component';
import { MainSidebarComponent } from './sidebar/main-sidebar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    SidebarComponent,
    SidenavContentAreaDirective,
    MainSidebarComponent,
    ExchangeSidebarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    ThemeSwitcherModule,
    MatSidenavModule,
    MatNavList,
    MatIcon,
    MatButtonModule,
    SidenavLinkModule
  ],
  exports: [
    ToolbarComponent,
    SidebarComponent,
    MainSidebarComponent,
    SidenavContentAreaDirective,
    ExchangeSidebarComponent
  ],
  providers: [SidebarService]
})
export class LayoutModule {}
