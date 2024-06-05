import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { EDateFormats } from '../../../../core/models/date.model';
import { dateFormatter } from '../../../../core/utils/date';
import { IRateHistoryModel } from '../../model/rate-history.model';
import { ExchangeService } from '../../services/exchange.service';
import { TOutputDateFilter } from './date-filter/date-filter.model';

type TState = {
  isLoading: boolean;
  error: HttpErrorResponse | null;
  filter: TOutputDateFilter | null;
  data: IRateHistoryModel[] | null;
};

@Injectable()
export class HistoryPageService {
  private exchangeService = inject(ExchangeService);
  private _pageState$ = new BehaviorSubject<TState>({
    data: null,
    isLoading: false,
    error: null,
    filter: null
  });
  public pageState$ = this._pageState$.asObservable();

  private getPageState(): TState {
    return this._pageState$.getValue();
  }

  private setPageState(data: Partial<TState>) {
    this._pageState$.next({ ...this.getPageState(), ...data });
  }

  fetchData(filter: TOutputDateFilter) {
    const params = {
      startDate: dateFormatter(filter.start, EDateFormats.DATE_SEPARATED_BY_DASH),
      endDate: dateFormatter(filter.end, EDateFormats.DATE_SEPARATED_BY_DASH)
    };
    this.setPageState({ isLoading: true, filter, data: null });
    this.exchangeService
      .getRateDynamic(filter.code, params)
      .pipe(take(1))
      .subscribe({
        next: data => {
          this.setPageState({ data, isLoading: false, error: null });
        },
        error: error => {
          this.setPageState({ error, isLoading: false, data: null });
        }
      });
  }
}
