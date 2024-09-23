import { Directive, Inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[curExpanderContent]'
})
export class ExpanderContentDirective {
  @Inject(TemplateRef) tmp: TemplateRef<any>;
}
