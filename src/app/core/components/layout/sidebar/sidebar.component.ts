import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
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
    const newWidth = value ? this.sidebarService.MAX_WIDTH : this.sidebarService.MIN_WIDTH;
    this.sidebarService.isOpen = value;
    this.sidebarService.sideBarWidth = newWidth;
    this.sidebarService.setResizingEvent({
      isResizing: false,
      startingWidth: newWidth,
      startingCursorX: 0
    });
  }

  startResizing(event: MouseEvent, startingWidth: number): void {
    this.sidebarService.setResizingEvent({
      isResizing: true,
      startingCursorX: event.clientX,
      startingWidth
    });
  }

  @HostListener('window:mousemove', ['$event'])
  updateSidenavWidth(event: MouseEvent) {
    const resizingEvent = this.sidebarService.getResizingEvent();
    if (!resizingEvent.isResizing) {
      return;
    }
    const cursorDeltaX = event.clientX - resizingEvent.startingCursorX;
    const newWidth = resizingEvent.startingWidth + cursorDeltaX;

    this.sidebarService.isOpen = newWidth > this.sidebarService.MIN_WIDTH;
    this.sidebarService.sideBarWidth = resizingEvent.startingWidth + cursorDeltaX;
  }

  @HostListener('window:mouseup')
  stopResizing() {
    this.sidebarService.setResizingEvent({
      isResizing: false
    });
  }
}
