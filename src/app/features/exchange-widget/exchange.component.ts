import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy
} from '@angular/core';

import { SidebarService } from '../../core/components/layout/services/sidebarService';
import { ExchangeSidebarComponent } from '../../core/components/layout/sidebar/exchange-sidebar.component';

@Component({
  selector: 'cur-exchange',
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
export class ExchangeComponent implements AfterViewInit, OnDestroy {
  sidebarService = inject(SidebarService);

  ngAfterViewInit() {
    this.sidebarService.addComponent(ExchangeSidebarComponent);
  }

  ngOnDestroy() {
    this.sidebarService.removeComponent();
  }
}
