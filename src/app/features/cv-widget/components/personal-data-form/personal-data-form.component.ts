import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { TNull } from '../../../../core/models/types';
import { dateFormatter, getToday, geYearsBefore } from '../../../../core/utils/date';
import { IPersonalDataModel } from '../../model/personal-data.model';

@Component({
  selector: 'cur-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrl: './personal-data-form.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalDataFormComponent implements OnInit, OnDestroy {
  @Input({ required: true }) controlKey = '';
  @Input() label?: string = '';

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef);
  parentContainer = inject(ControlContainer);

  readonly genderOptions: { label: string; value: string }[] = [
    { label: 'Не указывать', value: 'default' },
    { label: 'Mужской', value: 'male' },
    { label: 'Женский', value: 'female' }
  ];

  fg: FormGroup<IPersonalDataModel> = new FormGroup<IPersonalDataModel>({
    name: new FormControl('', [Validators.required]),
    secondName: new FormControl('', [Validators.required]),
    photo: new FormControl(null),
    middleName: new FormControl('', [Validators.required]),
    noMiddleName: new FormControl(false),
    birtDate: new FormControl(null, [Validators.required]),
    gender: new FormControl(this.genderOptions[0]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl(''),
    postalCode: new FormControl('')
  });
  readonly minBirthDate = geYearsBefore(120);
  readonly maxBirthDate = getToday();
  readonly birthDateErrors = {
    matDatepickerParse: () => 'Неправильный формат даты',
    matDatepickerMin: () => `Введенная дата должна быть больше ${dateFormatter(this.minBirthDate)}`,
    matDatepickerMax: () => `Введенная дата должна быть меньше ${dateFormatter(this.maxBirthDate)}`
  };

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    this.parentFormGroup.addControl(this.controlKey, this.fg);
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
  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }

  handleFileChange(data: TNull<File>) {
    const photoControl = this.fg.controls.photo;
    photoControl.setValue(data);
    photoControl.updateValueAndValidity();
  }
}
