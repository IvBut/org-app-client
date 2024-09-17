import { DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';
import { ModalContainerComponent } from '../components/modal/modal-container/modal-container.component';

export enum EModalSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}
export const MODAL_SIZE_MAP = {
  [EModalSize.SMALL]: {
    width: '450px',
    minHeight: '212px',
    maxHeight: 'calc(100vh - 64px)'
  },
  [EModalSize.MEDIUM]: {
    width: '600px',
    minHeight: '212px',
    maxHeight: 'calc(100vh - 64px)'
  },
  [EModalSize.LARGE]: {
    width: '800px',
    minHeight: '212px',
    maxHeight: 'calc(100vh - 64px)'
  }
} as const;

export class ModalConfig {
  size?: EModalSize = EModalSize.MEDIUM;
  caption?: string;
  description?: string;
  disableClose?: boolean = false;
  modalData: any = {};
}

export type TAdditionalModalConfig = Omit<
  DialogConfig<any>,
  'minHeight' | 'maxHeight' | 'width' | 'disableClose' | 'data'
>;

export type TInjectedModalData = Omit<ModalConfig, 'size' | 'disableClose'> & {
  component: ComponentType<any>;
};

export type TModalDataInjectionToken = {
  containerInstance: ModalContainerComponent;
  dialogRef: DialogRef<any>;
  modalData: any;
};
export const MODAL_DATA_INJECTION_TOKEN = new InjectionToken<string>('MODAL_DATA_INJECTION_TOKEN');
