import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { geYearsAfter, geYearsBefore } from '../../../../../core/utils/date';
import { DEFAULT_EDITOR_TOOLBAR } from '../../../model/editor.configs';
import { IEducationModel } from '../../../model/education.model';

const FORMATS = {
  parse: {
    dateInput: 'yyyy'
  },
  display: {
    dateInput: 'yyyy',
    monthYearLabel: 'yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'yyyy'
  }
};
@Component({
  selector: 'cur-education-form',
  templateUrl: './education-form.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ],
  encapsulation: ViewEncapsulation.None,
  styles: `
    :host {
      display: block;
    }

    .hide-date-picker-panel .mat-calendar-period-button {
      pointer-events: none;
    }

    .hide-date-picker-panel .mat-calendar-arrow {
      display: none;
    }

    .editor {
      width: 100%;
      height: 250px;
    }
  `,
  providers: [{ provide: MAT_DATE_FORMATS, useValue: FORMATS }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationFormComponent implements OnInit, OnDestroy {
  @Input() initModel?: TNullableType<IEducationModel>;
  @Input({ required: true }) controlKey = '';

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  parentContainer = inject(ControlContainer);

  fg: FormGroup<IEducationModel>;
  readonly minYear = geYearsBefore(80);
  readonly maxYear = geYearsAfter(5);
  readonly descriptionConfig: any = {
    toolbar: DEFAULT_EDITOR_TOOLBAR
  };

  readonly dateErrors = {
    matDatepickerParse: () => 'Некорректная дата',
    matDatepickerFilter: () => 'Некорректная дата'
  };

  startYearFilter = (d: Date) => {
    const endYear = this.fg.get('endYear').value;
    if (!endYear) {
      return dateFns.isAfter(d, this.minYear) && dateFns.isBefore(d, this.maxYear);
    }
    return (
      dateFns.isAfter(d, this.minYear) &&
      (dateFns.isSameYear(d, endYear) || dateFns.isBefore(d, endYear))
    );
  };

  endYearFilter = (d: Date) => {
    const startYear = this.fg.get('startYear').value;
    if (!startYear) {
      return dateFns.isAfter(d, this.minYear) && dateFns.isBefore(d, this.maxYear);
    }
    return (
      (dateFns.isSameYear(startYear, d) || dateFns.isAfter(d, dateFns.startOfYear(startYear))) &&
      dateFns.isBefore(d, this.maxYear)
    );
  };

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    this.fg = new FormGroup<IEducationModel>({
      institution: new FormControl(this.initModel?.institution ?? '', [Validators.required]),
      degree: new FormControl(this.initModel?.degree ?? '', [Validators.required]),
      location: new FormControl(this.initModel?.location ?? ''),
      startYear: new FormControl(this?.initModel?.startYear ?? null, [Validators.required]),
      endYear: new FormControl(this.initModel?.endYear ?? null, [Validators.required]),
      description: new FormControl(this.initModel?.description ?? '')
    });
    this.parentFormGroup.addControl(this.controlKey, this.fg);
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }

  closeDatePicker(date: Date, elem: MatDatepicker<any>, key: string) {
    const ctrlValue = date ?? geYearsBefore(0);
    this.fg.get(key).setValue(ctrlValue);
    elem.close();
  }
}
