import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SidebarService } from './core/components/layout/services/sidebarService';
import { MainSidebarComponent } from './core/components/layout/sidebar/main-sidebar.component';
import { iconConfig } from './shared/models/icon.model';
import { ThemeService } from './shared/services/themeService';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cur-root',
  template: `
    <cur-toolbar></cur-toolbar>
    <cur-sidebar>
      <router-outlet></router-outlet>
    </cur-sidebar>
  `,
  styles: [
    `
      :host {
        width: 100%;
        min-height: 100vh;
        height: 100%;
        position: relative;
      }
    `
  ]
})
export class AppComponent implements AfterViewInit {
  sidebarService = inject(SidebarService);
  sanitizer = inject(DomSanitizer);
  iconRegistry = inject(MatIconRegistry);
  themeService = inject(ThemeService);

  constructor() {
    iconConfig.forEach(el => {
      this.iconRegistry.addSvgIcon(
        el.name,
        this.sanitizer.bypassSecurityTrustResourceUrl(el.fileName)
      );
    });
    this.themeService.setTheme('indigo-pink');
  }

  ngAfterViewInit(): void {
    this.sidebarService.addComponent(MainSidebarComponent);
  }
}
