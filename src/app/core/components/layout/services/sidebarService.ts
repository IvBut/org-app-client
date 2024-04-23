import type { Type as Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SidenavContentAreaDirective } from '../directive/sidenav-content-area.directive';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidenavContent: SidenavContentAreaDirective;

  private componentsStack: Component<unknown>[] = [];

  private isOpened = new BehaviorSubject<boolean>(false);

  private isOpened$ = this.isOpened.asObservable();

  public set isOpen(val: boolean) {
    this.isOpened.next(val);
  }

  public get isOpen(): Observable<boolean> {
    return this.isOpened$;
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
