import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as dateFns from 'date-fns';
import { TNullableType } from '../../../../../core/models/types';
import { getToday, getTomorrow, geYearsBefore } from '../../../../../core/utils/date';
import { IWorkExpModel } from '../../../model/work-exp.model';

const MY_FORMATS = {
  parse: {
    dateInput: 'MM/yyyy'
  },
  display: {
    dateInput: 'MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy'
  }
};

@Component({
  selector: 'cur-work-exp-form',
  templateUrl: './work-exp-form.component.html',
  styleUrl: './work-exp-form.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkExpFormComponent implements OnInit, OnDestroy {
  @Input() initModel?: TNullableType<IWorkExpModel>;
  @Input({ required: true }) controlKey = '';

  parentContainer = inject(ControlContainer);

  fg: FormGroup<IWorkExpModel>;
  readonly minDate = geYearsBefore(80);
  readonly maxDate = getTomorrow();

  readonly dateErrors = {
    matDatepickerParse: () => 'Неправильный формат даты',
    matDatepickerFilter: () => 'Неправильный формат даты'
  };

  startDateFilter = (d: Date | null): boolean => {
    const today = getToday();
    const startDateVal = d || today;
    const endDateVal = this.fg.get('endDate').value;
    if (!endDateVal) {
      return (
        dateFns.isAfter(startDateVal, this.minDate) && dateFns.isBefore(startDateVal, this.maxDate)
      );
    }
    return (
      dateFns.isAfter(startDateVal, this.minDate) &&
      (dateFns.isSameMonth(startDateVal, endDateVal) || dateFns.isBefore(startDateVal, endDateVal))
    );
  };

  endDateFilter = (d: Date | null): boolean => {
    const today = getToday();
    const endDateVal = d || today;
    const startDateVal = this.fg.get('startDate').value;
    if (!startDateVal) {
      return (
        dateFns.isAfter(endDateVal, this.minDate) && dateFns.isBefore(endDateVal, this.maxDate)
      );
    }
    return (
      (dateFns.isSameMonth(startDateVal, endDateVal) ||
        dateFns.isAfter(endDateVal, dateFns.startOfMonth(startDateVal))) &&
      dateFns.isBefore(endDateVal, this.maxDate)
    );
  };

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  setMonthAndYear(normalizedMonthAndYear: Date, datepicker: MatDatepicker<Date>, key: string) {
    const ctrlValue = normalizedMonthAndYear ?? getToday();
    this.fg.get(key).setValue(ctrlValue);
    datepicker.close();
  }

  ngOnInit(): void {
    this.fg = new FormGroup<IWorkExpModel>({
      company: new FormControl(this.initModel?.company ?? '', [Validators.required]),
      jobPosition: new FormControl(this?.initModel?.jobPosition ?? '', [Validators.required]),
      location: new FormControl(this.initModel?.location ?? '', []),
      startDate: new FormControl(this?.initModel?.startDate ?? null, [Validators.required]),
      endDate: new FormControl(this.initModel?.endDate ?? null, [Validators.required])
      // description: new FormControl('', []),
    } as any);
    this.parentFormGroup.addControl(this.controlKey, this.fg);
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }
}
