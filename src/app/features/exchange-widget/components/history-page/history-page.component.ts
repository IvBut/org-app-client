import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexLegend,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent
} from 'ng-apexcharts';
import { filter, map, Observable } from 'rxjs';
import { dateFormatter } from '../../../../core/utils/date';
import { TOutputDateFilter } from './date-filter/date-filter.model';
import { HistoryPageService } from './history-page.service';

type TChart = {
  series: ApexAxisChartSeries;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  legend: ApexLegend;
};

@Component({
  selector: 'cur-history-page',
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss',
  providers: [HistoryPageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryPageComponent {
  pageService = inject(HistoryPageService);
  isLoading$: Observable<boolean> = this.pageService.pageState$.pipe(map(val => val.isLoading));
  isEmpty$: Observable<boolean> = this.pageService.pageState$.pipe(
    map(val => !!val.data && !val.data?.length)
  );
  hasError$: Observable<boolean> = this.pageService.pageState$.pipe(map(val => !!val.error));
  data$: Observable<TChart | null> = this.pageService.pageState$.pipe(
    filter(el => !!el.data),
    map(({ data, filter }) => {
      const dates: string[] = [];
      const nums: number[] = [];
      data.forEach(el => {
        dates.push(el.Date);
        nums.push(el.Cur_OfficialRate);
      });
      return {
        title: {
          text: `${filter.scale}(${filter.label}) - бел. руб`
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          position: 'bottom',
          horizontalAlign: 'center',
          customLegendItems: [`max - ${Math.max(...nums)}`, `min - ${Math.min(...nums)}`]
        },
        series: [
          {
            name: '',
            data: nums
          }
        ],
        xaxis: {
          type: 'datetime',
          labels: {
            formatter(_: string, timestamp?: number): string | string[] {
              return dateFormatter(timestamp);
            }
          },
          categories: dates
        }
      } as TChart;
    })
  );
  @ViewChild('chart', { static: false }) chart: ChartComponent;

  handleDates(filter: TOutputDateFilter) {
    this.pageService.fetchData(filter);
  }
}
