import { EIconName, TIconSize } from '../../../models/icon.model';

export enum EExpanderItemAction {
  EDIT = 'EDIT',
  DELETE = 'DELETE'
}
export interface IExpanderItemAction {
  btnName: EExpanderItemAction;
  icon: {
    name: EIconName;
    size?: TIconSize;
  };
  color: string;
  disabled?: false;
}

export const DEFAULT_EXPANDER_ITEM_ACTIONS: IExpanderItemAction[] = [
  {
    btnName: EExpanderItemAction.EDIT,
    icon: {
      name: EIconName.EDIT
    },
    color: 'primary',
    disabled: false
  },
  {
    btnName: EExpanderItemAction.DELETE,
    icon: {
      name: EIconName.DELETE
    },
    color: 'accent',
    disabled: false
  }
];

export type TExpanderItemActionOutput = { btnName: EExpanderItemAction; index: number };
