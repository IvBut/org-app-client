import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { IconSizeModule } from '../../../shared/directives/icon-size/icon-size/icon-size.module';
import { ModalActionsDirective } from './directives/modal-actions.directive';
import { ModalCaptionDirective } from './directives/modal-caption.directive';
import { ModalDescriptionDirective } from './directives/modal-description.directive';
import { ModalIconDirective } from './directives/modal-icon.directive';
import { ModalActionsComponent } from './modal-actions/modal-actions.component';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalService } from './services/modal.service';

@NgModule({
  declarations: [
    ModalContainerComponent,
    ModalHeaderComponent,
    ModalCaptionDirective,
    ModalDescriptionDirective,
    ModalIconDirective,
    ModalActionsComponent,
    ModalActionsDirective
  ],
  imports: [CommonModule, DialogModule, MatIcon, IconSizeModule],
  providers: [ModalService],
  exports: [ModalContainerComponent, ModalActionsDirective]
})
export class ModalModule {}
