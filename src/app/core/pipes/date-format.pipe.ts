import { Pipe, PipeTransform } from '@angular/core';
import * as dateFns from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import { EDateFormats } from '../models/date.model';
import { TDateFormatterInpDate, dateFormatter } from '../utils/date';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(
    value: TDateFormatterInpDate,
    format: string = EDateFormats.DATE_WITH_DOTS,
    emptyValue: string = '',
    options: dateFns.FormatOptions = { locale: ru }
  ): unknown {
    return dateFormatter(value, format, emptyValue, options);
  }
}
