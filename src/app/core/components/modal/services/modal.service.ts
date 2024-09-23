import { Dialog } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MODAL_SIZE_MAP, ModalConfig, TAdditionalModalConfig } from '../../../models/modal.model';
import { ModalContainerComponent } from '../modal-container/modal-container.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private readonly dialog = inject(Dialog);

  openModal(
    component: ComponentType<any>,
    modalConfig?: ModalConfig,
    additionalConfig?: TAdditionalModalConfig
  ) {
    const defaultConfig = new ModalConfig();
    const config = { ...defaultConfig, ...modalConfig };
    const sizes = MODAL_SIZE_MAP[config.size];
    return this.dialog.open(ModalContainerComponent, {
      ...(additionalConfig || {}),
      ...sizes,
      disableClose: config?.disableClose,
      data: {
        component,
        ...config
      }
    });
  }
}
