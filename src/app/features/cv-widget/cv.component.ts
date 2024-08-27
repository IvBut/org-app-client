import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy
} from '@angular/core';

import { SidebarService } from '../../core/components/layout/services/sidebarService';
import { CvSidebarComponent } from '../../core/components/layout/sidebar/cv-sidebar.component';

@Component({
  selector: 'cur-cv',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `
  ]
})
export class CvComponent implements AfterViewInit, OnDestroy {
  sidebarService = inject(SidebarService);

  ngAfterViewInit() {
    this.sidebarService.addComponent(CvSidebarComponent);
  }

  ngOnDestroy() {
    this.sidebarService.removeComponent();
  }
}
