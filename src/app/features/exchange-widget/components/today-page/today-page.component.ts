import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CurrencyModel } from '../../../../core/models/currency.model';
import { EIconName } from '../../../../shared/models/icon.model';
import { IExchangeModel } from '../../model/exchange.model';
import { ExchangeService } from '../../services/exchange.service';

const DEFAULT_OPTIONS = [
  { label: 'Доллары', value: CurrencyModel.USD },
  { label: 'Евро', value: CurrencyModel.EUR }
];

@Component({
  selector: 'cur-today-page',
  templateUrl: './today-page.component.html',
  styleUrl: './today-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodayPageComponent implements OnInit {
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  exChangeService: ExchangeService = inject(ExchangeService);
  data: IExchangeModel[] = [];
  dataToDisplay: IExchangeModel[] = [];
  filteredData: IExchangeModel[] = [];
  displayedColumns = ['currency', 'byn'];
  pageSize = 5;
  pageIndex = 0;
  total = 0;
  pageSizeOptions = [5, 10, 15];
  selectedOptions: string[] = [...DEFAULT_OPTIONS.map(el => el.value)];
  options: { label: string; value: string; disabled?: boolean }[] = [
    { label: 'Выбрать всё', value: 'ALL' },
    ...DEFAULT_OPTIONS,
    { label: 'Рубли', value: CurrencyModel.RUB },
    { label: 'Злотые', value: CurrencyModel.PLN }
  ];
  isLoading = false;
  hasError = false;

  private setDataToDisplay(list: IExchangeModel[]) {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.dataToDisplay = list.slice(start, end > list.length ? list.length : end);
    this.cdr.markForCheck();
  }

  private setFilteredData(filter: string[]) {
    const isAllSelected = filter.includes('ALL');
    this.pageIndex = 0;
    const newOptions = this.options.map(el => ({
      ...el,
      disabled: isAllSelected && el.value !== 'ALL'
    }));
    this.options = newOptions;
    if (isAllSelected) {
      this.selectedOptions = newOptions.map(el => el.value);
    } else {
      this.selectedOptions = [...filter];
    }
    this.filteredData = isAllSelected
      ? this.data
      : this.data.filter(el => filter.find(code => el.Cur_Abbreviation === code));
    this.total = this.filteredData.length;
    this.setDataToDisplay(this.filteredData);
  }

  handleOnPage({ pageSize, pageIndex }: PageEvent) {
    if (this.pageSize !== pageSize) {
      this.pageSize = pageSize;
      this.pageIndex = 0;
    } else {
      this.pageIndex = pageIndex;
    }
    this.setDataToDisplay(this.filteredData);
  }

  handleSelect(list: string[]) {
    this.setFilteredData(list);
  }

  private fetch() {
    this.isLoading = true;
    this.hasError = false;
    this.data = [];
    this.setFilteredData(this.selectedOptions);
    this.cdr.markForCheck();
    this.exChangeService.getRate({ periodicity: '0' }).subscribe({
      next: data => {
        this.data = data;
        this.setFilteredData(this.selectedOptions);
        this.isLoading = false;
        this.hasError = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading = false;
        this.hasError = true;
        this.data = [];
        this.setFilteredData(this.selectedOptions);
        this.cdr.markForCheck();
      }
    });
  }
  handleFetch() {
    this.fetch();
  }
  ngOnInit() {
    this.fetch();
  }

  protected readonly EIconName = EIconName;
}
