import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EDateFormats } from '../../../../core/models/date.model';
import { dateFormatter } from '../../../../core/utils/date';
import { ExchangeService } from '../../services/exchange.service';
import { TOutputDateFilter } from './date-filter/date-filter.model';

@Component({
  selector: 'cur-history-page',
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryPageComponent {
  exchangeService = inject(ExchangeService);
  ngOnInit() {}

  handleDates(data: TOutputDateFilter) {
    const params = {
      startDate: dateFormatter(data.start, EDateFormats.DATE_SEPARATED_BY_DASH),
      endDate: dateFormatter(data.end, EDateFormats.DATE_SEPARATED_BY_DASH)
    };
    this.exchangeService.getRateDynamic(data.code, params).subscribe({
      next: value => {
        console.log('>>>', value);
      },
      error: err => {
        console.log('!!!', err);
      }
    });
  }
}
