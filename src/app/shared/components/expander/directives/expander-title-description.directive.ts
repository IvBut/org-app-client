import { Directive, Inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[curExpanderTitleDescription]'
})
export class ExpanderTitleDescriptionDirective {
  @Inject(TemplateRef) tmp: TemplateRef<any>;
}
