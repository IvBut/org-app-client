import { MenuPositionX, MenuPositionY } from '@angular/material/menu';

export interface IThemeSwitcherOption {
  backgroundColor: string;
  buttonColor: string;
  headingColor: string;
  label: string;
  value: string;
}

export type TThemeMenuPosition = {
  x?: MenuPositionX;
  y?: MenuPositionY;
};
