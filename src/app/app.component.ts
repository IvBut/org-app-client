import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SidebarService } from './core/components/layout/services/sidebarService';
import { MainSidebarComponent } from './core/components/layout/sidebar/main-sidebar.component';

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

  ngAfterViewInit(): void {
    this.sidebarService.addComponent(MainSidebarComponent);
  }
}
