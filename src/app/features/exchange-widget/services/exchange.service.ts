import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { getCurrencySymbolByAbbreviation } from '../../../core/utils/currency';
import { IExchangeDTO, IExchangeModel } from '../model/exchange.model';

@Injectable()
export class ExchangeService {
  private readonly apiPrefix = '/api/pr/bank';

  constructor(private http: HttpClient) {}

  private getUrl(path: string) {
    return `${this.apiPrefix}${path}`;
  }

  getRate(dto: IExchangeDTO): Observable<IExchangeModel[]> {
    return this.http
      .get<IExchangeModel[]>(this.getUrl('/exrates/rates'), {
        params: { ...dto }
      })
      .pipe(
        map(list => {
          return list.map(el => ({
            ...el,
            symbol: getCurrencySymbolByAbbreviation(el?.Cur_Abbreviation)
          }));
        })
      );
  }
}
