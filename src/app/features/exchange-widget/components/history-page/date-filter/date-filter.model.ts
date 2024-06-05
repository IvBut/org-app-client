export interface IDateChipsModel {
  label: string;
  value: {
    id: string;
    dateRange: Date[];
  };
}

export type TDateAcmpOption = { label: string; value: string; id: string; scale: number };

export enum EDateChip {
  LAST_WEEK = 'LAST_WEEK',
  LAST_MONTH = 'LAST_MONTH',
  LAST_YEAR = 'LAST_YEAR'
}

export type TOutputDateFilter = {
  start: Date;
  end: Date;
  code: string;
  scale: number;
  label: string;
};
