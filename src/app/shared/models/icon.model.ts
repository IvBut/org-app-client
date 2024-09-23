export enum EIconName {
  ERROR = 'error',
  INFO = 'info',
  DOUBLE_ARROW = 'double_arrow',
  ARROW_BACK = 'arrow_back',
  HOME = 'home',
  CURRENCY_EXCHANGE = 'currency_exchange',
  SETTINGS = 'settings',
  TODAY = 'today',
  HISTORY = 'history',
  PALETTE = 'palette',
  FILTER_ALT_OFF = 'filter_alt_off',
  REFRESH = 'refresh',
  CLOSE = 'close',
  CV = 'cv',
  ADD = 'add',
  PHOTO_CAMERA = 'photo_camera',
  EDIT = 'edit',
  DELETE = 'delete',
  DRAG = 'drag'
}

export enum EIconSize {
  XXSmall = 'XXSmall',
  XSmall = 'XSmall',
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  XLarge = 'XLarge',
  XXLarge = 'XXLarge',
  XXXLarge = 'XXXLarge'
}

interface IIconConfig {
  name: EIconName;
  fileName: string;
}

export type TIconSize = EIconSize | keyof typeof EIconSize;

const getPath = (fileName: string) => `/assets/icons/${fileName}.svg`;

export const iconConfig: IIconConfig[] = [
  {
    fileName: getPath('error'),
    name: EIconName.ERROR
  },
  {
    fileName: getPath('info'),
    name: EIconName.INFO
  },
  {
    fileName: getPath('double_arrow'),
    name: EIconName.DOUBLE_ARROW
  },
  {
    fileName: getPath('arrow_back'),
    name: EIconName.ARROW_BACK
  },
  {
    fileName: getPath('home'),
    name: EIconName.HOME
  },
  {
    fileName: getPath('currency_exchange'),
    name: EIconName.CURRENCY_EXCHANGE
  },
  {
    fileName: getPath('settings'),
    name: EIconName.SETTINGS
  },
  {
    fileName: getPath('today'),
    name: EIconName.TODAY
  },
  {
    fileName: getPath('history'),
    name: EIconName.HISTORY
  },
  {
    fileName: getPath('palette'),
    name: EIconName.PALETTE
  },
  {
    fileName: getPath('filter_alt_off'),
    name: EIconName.FILTER_ALT_OFF
  },
  {
    fileName: getPath('refresh'),
    name: EIconName.REFRESH
  },
  {
    fileName: getPath('close'),
    name: EIconName.CLOSE
  },
  {
    fileName: getPath('cv'),
    name: EIconName.CV
  },
  {
    fileName: getPath('add'),
    name: EIconName.ADD
  },
  {
    fileName: getPath('photo_camera'),
    name: EIconName.PHOTO_CAMERA
  },
  {
    fileName: getPath('edit'),
    name: EIconName.EDIT
  },
  {
    fileName: getPath('delete'),
    name: EIconName.DELETE
  },
  {
    fileName: getPath('drag_pan'),
    name: EIconName.DRAG
  }
];
