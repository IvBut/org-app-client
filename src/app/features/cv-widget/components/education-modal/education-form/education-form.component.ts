import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as dateFns from 'date-fns';
import { TNullableType } from '../../../../../core/models/types';
import { geYearsAfter, geYearsBefore, getDate } from '../../../../../core/utils/date';
import { DEFAULT_EDITOR_TOOLBAR } from '../../../model/editor.configs';
import { IEducationModel, TEducationModelData } from '../../../model/education.model';
import {
  AttachToContainer,
  controlContainerProvider
} from '../../attach-to-container/attach-to-container.directive';

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
  viewProviders: [controlContainerProvider],
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
export class EducationFormComponent extends AttachToContainer implements OnInit, OnDestroy {
  @Input() initModel?: TNullableType<TEducationModelData>;

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

  ngOnInit() {
    this.fg = new FormGroup<IEducationModel>({
      institution: new FormControl(this.initModel?.institution ?? '', [Validators.required]),
      degree: new FormControl(this.initModel?.degree ?? '', [Validators.required]),
      location: new FormControl(this.initModel?.location ?? ''),
      startYear: new FormControl(getDate(this?.initModel?.startYear), [Validators.required]),
      endYear: new FormControl(getDate(this.initModel?.endYear), [Validators.required]),
      description: new FormControl(this.initModel?.description ?? '')
    });
    this.registerControl(this.fg);
  }

  ngOnDestroy() {
    this.unRegisterControl();
  }

  closeDatePicker(date: Date, elem: MatDatepicker<any>, key: string) {
    const ctrlValue = date ?? geYearsBefore(0);
    this.fg.get(key).setValue(ctrlValue);
    elem.close();
  }
}
