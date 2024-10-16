import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatChipListboxChange } from '@angular/material/chips';
import { isEqual, isValid } from 'date-fns';
import { Observable, Subject, map, startWith, takeUntil } from 'rxjs';
import { getNbRbCurrencies } from '../../../../../core/utils/currency';
import {
  dateFormatter,
  getLastMonthRange,
  getLastWeekRange,
  getLastYearRange,
  getToday
} from '../../../../../core/utils/date';
import { EIconName } from '../../../../../shared/models/icon.model';
import {
  EDateChip,
  IDateChipsModel,
  TDateAcmpOption,
  TOutputDateFilter
} from './date-filter.model';

const today = getToday();
const lastWeek = getLastWeekRange();
const lastMonth = getLastMonthRange();
const lastYear = getLastYearRange();

const ERRORS = {
  required: 'Поле обязательно для заполненния',
  invalidAutocompleteObject: 'Выберите значение из списка'
};

function autocompleteValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (typeof control.value === 'string' && control.value) {
      return { invalidAutocompleteObject: true };
    }
    return null;
  };
}

@Component({
  selector: 'cur-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrl: './date-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateFilterComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  protected readonly EIconName = EIconName;
  range = new FormGroup({
    start: new FormControl<Date | null>(null, [Validators.required]),
    end: new FormControl<Date | null>(null, [Validators.required])
  });
  min = lastYear[0];
  max = today;
  options: TDateAcmpOption[] = getNbRbCurrencies().map(el => ({
    label: el.name,
    value: el.nbrb.curId.toString(),
    id: el.currencyId,
    scale: el.nbrb.curScale
  }));
  autocmpControl = new FormControl<TDateAcmpOption | null>(null, [
    Validators.required,
    autocompleteValidator()
  ]);
  filteredOptions: Observable<TDateAcmpOption[]>;
  @Output() submitFilterData = new EventEmitter<TOutputDateFilter>();
  private setFieldErrors(validationErrors: Validators): string[] {
    if (!validationErrors) return [];
    return Object.entries(validationErrors).reduce((acc, error) => {
      const [key, val] = error;
      if (ERRORS[key] && val) {
        acc.push(ERRORS[key]);
      }
      return acc;
    }, []);
  }

  protected readonly CONFIG: IDateChipsModel[] = [
    {
      label: 'Последняя неделя',
      value: {
        id: EDateChip.LAST_WEEK,
        dateRange: lastWeek
      }
    },
    {
      label: 'Последний месяц',
      value: {
        id: EDateChip.LAST_MONTH,
        dateRange: lastMonth
      }
    },
    {
      label: 'Последний год',
      value: {
        dateRange: lastYear,
        id: EDateChip.LAST_YEAR
      }
    }
  ];
  chipsValue: IDateChipsModel['value'] | null = null;
  get hint() {
    return `c ${dateFormatter(this.min)} по ${dateFormatter(this.max)}`;
  }

  get acmpErrors(): string[] {
    return this.setFieldErrors(this.autocmpControl.errors);
  }

  get rangeErrors(): string[] {
    return Array.from(
      new Set([
        ...this.setFieldErrors(this.range.controls.start.errors),
        ...this.setFieldErrors(this.range.controls.end.errors)
      ])
    );
  }

  ngOnInit() {
    this.range.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(({ start, end }) => {
      const chip =
        isValid(start) &&
        isValid(end) &&
        this.CONFIG.find(el => {
          const [chipsStart, chipsEnd] = el.value.dateRange;
          return isEqual(start, chipsStart) && isEqual(end, chipsEnd);
        });
      if (chip) {
        this.chipsValue = { ...chip.value };
      } else {
        this.chipsValue = null;
      }
    });
    this.filteredOptions = this.autocmpControl.valueChanges.pipe(
      startWith(''),
      map((opt: string | TDateAcmpOption) => {
        const val = typeof opt === 'string' ? opt : opt?.label;
        return val ? this._filter(val as string) : this.options.slice();
      })
    );
  }

  handleClearRange() {
    this.range.reset({ start: null, end: null });
    this.chipsValue = null;
  }

  handleClearAcmp() {
    this.autocmpControl.reset(null);
  }

  handleSelection({ value }: MatChipListboxChange) {
    const [start, end] = value.dateRange;
    this.chipsValue = { ...value };
    this.range.setValue({ start, end });
  }

  handleExec() {
    this.submitFilterData.emit({
      ...this.range.value,
      code: this.autocmpControl.value.value,
      scale: this.autocmpControl.value.scale,
      label: this.autocmpControl.value.label
    } as TOutputDateFilter);
  }

  displayFn(data: TDateAcmpOption): string {
    return data && data.label ? `${data.label} (Кол-во: ${data.scale})` : '';
  }

  private _filter(label: string): TDateAcmpOption[] {
    const filterValue = label.toLowerCase();

    return this.options.filter(option => option.label.toLowerCase().includes(filterValue));
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
