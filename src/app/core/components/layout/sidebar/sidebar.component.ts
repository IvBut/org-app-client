import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild
} from '@angular/core';

import { EIconName } from '../../../../shared/models/icon.model';
import { SidenavContentAreaDirective } from '../directive/sidenav-content-area.directive';
import { SidebarService } from '../services/sidebarService';

@Component({
  selector: 'cur-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements AfterViewInit {
  sidebarService = inject(SidebarService);
  protected readonly EIconName = EIconName;

  @ViewChild(SidenavContentAreaDirective, { static: false })
  curSidenavContentArea: SidenavContentAreaDirective;

  ngAfterViewInit(): void {
    this.sidebarService.registerSidenavContent(this.curSidenavContentArea);
  }

  toggle(value: boolean) {
    this.sidebarService.isOpen = value;
  }
}
