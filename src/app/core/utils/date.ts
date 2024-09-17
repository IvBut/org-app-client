import * as dateFns from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import { EDateFormats } from '../models/date.model';

export const dateFormatter = (
  date: Date | number | string | undefined | null,
  outputFormat: string = EDateFormats.DATE_WITH_DOTS,
  emptyValue: string = '',
  options: dateFns.FormatOptions = { locale: ru }
) => {
  if (!date && date !== 0) return emptyValue;
  return dateFns.isValid(date) ? dateFns.formatDate(date, outputFormat, options) : emptyValue;
};
export const getToday = () => {
  return dateFns.startOfToday();
};

export const getTomorrow = () => {
  return dateFns.addDays(dateFns.startOfToday(), 1);
};

export const getTodayRange = () => {
  return [dateFns.startOfToday(), dateFns.startOfToday()];
};

export const getLastWeekRange = () => {
  const today = getToday();
  return [dateFns.subWeeks(today, 1), today];
};

export const getLastMonthRange = () => {
  const today = getToday();
  return [dateFns.subMonths(today, 1), today];
};

export const getLastYearRange = () => {
  const today = getToday();
  return [dateFns.subYears(today, 1), today];
};

export const geYearsBefore = (count: number) => {
  const today = getToday();
  return dateFns.subYears(today, count);
};

export const geYearsAfter = (count: number) => {
  const today = getToday();
  return dateFns.addYears(today, count);
};
