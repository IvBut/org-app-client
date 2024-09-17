import { Directive, Input, OnInit, TemplateRef } from '@angular/core';
import { ModalContainerComponent } from '../modal-container/modal-container.component';

@Directive({
  selector: '[curModalActions]'
})
export class ModalActionsDirective implements OnInit {
  @Input() curModalActions: ModalContainerComponent;

  constructor(public templateRef: TemplateRef<any>) {}

  ngOnInit(): void {
    this.curModalActions.setActionsTemplate(this.templateRef);
  }
}
