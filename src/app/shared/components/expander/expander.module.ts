import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { IconSizeModule } from '../../directives/icon-size/icon-size/icon-size.module';
import { ExpanderContentDirective } from './directives/expander-content.directive';
import { ExpanderTitleDescriptionDirective } from './directives/expander-title-description.directive';
import { ExpanderTitleDirective } from './directives/expander-title.directive';
import { ExpanderItemComponent } from './expander-item/expander-item.component';
import { ExpanderComponent } from './expander.component';

@NgModule({
  declarations: [
    ExpanderComponent,
    ExpanderItemComponent,
    ExpanderTitleDirective,
    ExpanderTitleDescriptionDirective,
    ExpanderContentDirective
  ],
  exports: [
    ExpanderComponent,
    ExpanderItemComponent,
    ExpanderTitleDirective,
    ExpanderTitleDescriptionDirective,
    ExpanderContentDirective
  ],
  imports: [CommonModule, MatAccordion, MatExpansionModule, MatIcon, MatIconButton, IconSizeModule]
})
export class ExpanderModule {}
