import type { Type as Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SidenavContentAreaDirective } from '../directive/sidenav-content-area.directive';

type TResizingEvent = {
  isResizing: boolean;
  startingCursorX: number;
  startingWidth: number;
};

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public readonly MIN_WIDTH = 60;
  public readonly MAX_WIDTH = 280;
  private sidenavContent: SidenavContentAreaDirective;

  private componentsStack: Component<unknown>[] = [];

  private isOpened = new BehaviorSubject<boolean>(false);
  private resizingEvent = new BehaviorSubject<TResizingEvent>({
    isResizing: false,
    startingCursorX: 0,
    startingWidth: 0
  });
  private width = new BehaviorSubject<number>(this.MIN_WIDTH);

  private isOpened$ = this.isOpened.asObservable();
  private resizingEvent$ = this.resizingEvent.asObservable();
  private width$ = this.width.asObservable();

  public set isOpen(val: boolean) {
    this.isOpened.next(val);
  }

  public get isOpen(): Observable<boolean> {
    return this.isOpened$;
  }

  public get resizing() {
    return this.resizingEvent$;
  }

  public getResizingEvent() {
    return this.resizingEvent.getValue();
  }

  public setResizingEvent(data: Partial<TResizingEvent>) {
    this.resizingEvent.next({ ...this.resizingEvent.getValue(), ...data } as TResizingEvent);
  }

  public get sideBarWidth(): Observable<number> {
    return this.width$;
  }

  public set sideBarWidth(width: number) {
    const clampedWidth = Math.min(Math.max(width, this.MIN_WIDTH), this.MAX_WIDTH);
    this.width.next(clampedWidth);
  }

  private attach(component: Component<unknown>) {
    if (this.sidenavContent) {
      this.sidenavContent.viewContainerRef.clear();
      const cmp = this.sidenavContent.viewContainerRef.createComponent(component);
      cmp.changeDetectorRef.detectChanges();
    }
  }

  registerSidenavContent(sidenavContent: SidenavContentAreaDirective) {
    this.sidenavContent = sidenavContent;
  }

  addComponent(component: Component<unknown>) {
    this.componentsStack.push(component);
    this.attach(component);
  }

  removeComponent() {
    if (this.componentsStack.length === 1) {
      return;
    }
    this.componentsStack.pop();
    this.attach(this.componentsStack[this.componentsStack.length - 1]);
  }
}
