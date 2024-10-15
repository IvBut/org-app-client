import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TNull, TNullableType } from '../../../../core/models/types';
import { dateFormatter, getToday, geYearsBefore } from '../../../../core/utils/date';
import {
  GENDER_OPTIONS,
  IPersonalModel,
  TPersonalModelData
} from '../../model/personal-data.model';
import {
  AttachToContainer,
  controlContainerProvider
} from '../attach-to-container/attach-to-container.directive';

@Component({
  selector: 'cur-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrl: './personal-data-form.component.scss',
  viewProviders: [controlContainerProvider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalDataFormComponent extends AttachToContainer implements OnInit {
  @Input() initModel?: TNullableType<TPersonalModelData>;

  private _formBuilder = inject(FormBuilder);
  destroyRef = inject(DestroyRef);

  readonly genderOptions: { label: string; value: string }[] = GENDER_OPTIONS;

  fg: FormGroup<IPersonalModel>;
  readonly minBirthDate = geYearsBefore(120);
  readonly maxBirthDate = getToday();
  readonly birthDateErrors = {
    matDatepickerParse: () => 'Неправильный формат даты',
    matDatepickerMin: () => `Введенная дата должна быть больше ${dateFormatter(this.minBirthDate)}`,
    matDatepickerMax: () => `Введенная дата должна быть меньше ${dateFormatter(this.maxBirthDate)}`
  };

  ngOnInit() {
    const noMiddleName = !!this?.initModel?.noMiddleName;
    this.fg = this._formBuilder.group({
      name: [this.initModel?.name ?? '', [Validators.required]],
      secondName: [this?.initModel?.secondName ?? '', [Validators.required]],
      photo: [this?.initModel?.photo ?? null],
      middleName: new FormControl(
        {
          value: noMiddleName ? '' : (this?.initModel?.middleName ?? ''),
          disabled: noMiddleName
        },
        noMiddleName ? [] : [Validators.required]
      ),
      noMiddleName: [noMiddleName],
      birtDate: new FormControl(
        this.initModel?.birtDate ? new Date(this.initModel.birtDate) : null,
        {
          nonNullable: false,
          validators: [Validators.required]
        }
      ),
      gender: [
        this.initModel?.gender
          ? (GENDER_OPTIONS.find(el => el.value === this.initModel?.gender)?.value as string)
          : (GENDER_OPTIONS[0].value as string)
      ],
      email: [this?.initModel?.email ?? '', [Validators.required, Validators.email]],
      phone: [this?.initModel?.phone ?? ''],
      country: [this.initModel?.country ?? ''],
      city: [this?.initModel?.city ?? ''],
      address: [this?.initModel?.address ?? ''],
      postalCode: [this?.initModel?.postalCode ?? '']
    });
    this.registerControl(this.fg);
    this.fg.controls.noMiddleName.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(val => {
        const middleName = this.fg.controls.middleName;
        if (val) {
          middleName.removeValidators(Validators.required);
          middleName.setValue('');
          middleName.disable();
        } else {
          middleName.addValidators(Validators.required);
          middleName.enable();
        }
        middleName.updateValueAndValidity();
      });
  }

  handleFileChange(data: TNull<File>) {
    const photoControl = this.fg.controls.photo;
    photoControl.setValue(data);
    photoControl.updateValueAndValidity();
  }
}
