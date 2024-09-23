import { Directive, Inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[curExpanderTitle]'
})
export class ExpanderTitleDirective {
  @Inject(TemplateRef) tmp: TemplateRef<any>;
}
