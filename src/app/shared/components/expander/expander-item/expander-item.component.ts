import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';
import { ExpanderContentDirective } from '../directives/expander-content.directive';
import { ExpanderTitleDescriptionDirective } from '../directives/expander-title-description.directive';
import { ExpanderTitleDirective } from '../directives/expander-title.directive';
import {
  DEFAULT_EXPANDER_ITEM_ACTIONS,
  IExpanderItemAction,
  TExpanderItemActionOutput
} from '../models/expander.model';

@Component({
  selector: 'cur-expander-item',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpanderItemComponent {
  @Input() isDisabled: boolean = false;

  @ContentChild(ExpanderTitleDirective, { read: TemplateRef })
  title: TemplateRef<any>;
  @ContentChild(ExpanderTitleDescriptionDirective, { read: TemplateRef })
  titleDescription: TemplateRef<any>;
  @ContentChild(ExpanderContentDirective, { read: TemplateRef })
  content: TemplateRef<any>;

  @Input() actions: IExpanderItemAction[] = DEFAULT_EXPANDER_ITEM_ACTIONS;

  @Output() actionClick = new EventEmitter<TExpanderItemActionOutput>();
}
