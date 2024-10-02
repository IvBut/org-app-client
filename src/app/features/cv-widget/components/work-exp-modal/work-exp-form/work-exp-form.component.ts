import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as dateFns from 'date-fns';
import { TNullableType } from '../../../../../core/models/types';
import { getToday, getTomorrow, geYearsBefore } from '../../../../../core/utils/date';
import { DEFAULT_EDITOR_TOOLBAR } from '../../../model/editor.configs';
import { IWorkExpModel } from '../../../model/work-exp.model';

const FORMATS = {
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
  providers: [{ provide: MAT_DATE_FORMATS, useValue: FORMATS }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkExpFormComponent implements OnInit, OnDestroy {
  @Input() initModel?: TNullableType<IWorkExpModel>;
  @Input({ required: true }) controlKey = '';

  parentContainer = inject(ControlContainer);
  destroyRef = inject(DestroyRef);

  fg: FormGroup<IWorkExpModel>;
  readonly minDate = geYearsBefore(80);
  readonly maxDate = getTomorrow();

  readonly descriptionConfig: any = {
    toolbar: DEFAULT_EDITOR_TOOLBAR
  };

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
    const stillWorking = !!this.initModel?.stillWorking;
    this.fg = new FormGroup<IWorkExpModel>({
      company: new FormControl(this.initModel?.company ?? '', [Validators.required]),
      jobPosition: new FormControl(this?.initModel?.jobPosition ?? '', [Validators.required]),
      location: new FormControl(this.initModel?.location ?? '', []),
      startDate: new FormControl(this?.initModel?.startDate ?? null, [Validators.required]),
      endDate: new FormControl(
        {
          value: stillWorking ? getToday() : (this.initModel?.endDate ?? null),
          disabled: stillWorking
        },
        [Validators.required]
      ),
      stillWorking: new FormControl(!!this.initModel?.stillWorking),
      description: new FormControl(this.initModel?.description ?? '', [])
    } as any);
    this.parentFormGroup.addControl(this.controlKey, this.fg);
    this.fg
      .get('stillWorking')
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(flag => {
        const dateControl = this.fg.get('endDate');
        if (flag) {
          dateControl.setValue(getToday());
          dateControl.markAsUntouched();
          dateControl.disable();
          dateControl.updateValueAndValidity();
        } else {
          dateControl.setValue(null);
          dateControl.enable();
        }
      });
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }
}
