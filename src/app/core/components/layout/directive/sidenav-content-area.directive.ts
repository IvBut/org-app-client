import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[curSidenavContentArea]'
})
export class SidenavContentAreaDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
