import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TNull, TNullableType } from '../../../core/models/types';

export type TPickExpOption = {
  label: string;
  value: string;
};

const DEFAULT_OPTIONS: TPickExpOption[] = [
  {
    label: 'Novice',
    value: 'Novice'
  },
  {
    label: 'Beginner',
    value: 'Beginner'
  },
  {
    label: 'Skillful',
    value: 'Skillful'
  },
  {
    label: 'Experienced',
    value: 'Experienced'
  },
  {
    label: 'Expert',
    value: 'Expert'
  },
  {
    label: 'SuperExpert',
    value: 'SuperExpert'
  }
];

@Component({
  selector: 'cur-pick-experience',
  templateUrl: './pick-experience.component.html',
  styleUrl: './pick-experience.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PickExperienceComponent
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickExperienceComponent implements OnChanges, ControlValueAccessor {
  @Input()
  pickExpOptions?: TPickExpOption[] = DEFAULT_OPTIONS;
  @Input()
  pickedValue?: TNullableType<TPickExpOption>;
  @Output()
  pickedValueChange = new EventEmitter<TNullableType<TPickExpOption>>();

  _pickedValue?: TNullableType<TPickExpOption>;
  _index: TNull<number> = null;

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  touched = false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange(_?: TNullableType<TPickExpOption>) {}
  onTouched = () => {};

  ngOnChanges({ pickedValue }: SimpleChanges): void {
    const idx = this.pickExpOptions.findIndex(el => el.value === pickedValue?.currentValue);
    if (idx > -1) {
      this.pickedValue = this.pickExpOptions[idx];
      this._index = idx;
    } else {
      this._pickedValue = null;
      this._index = null;
    }
  }

  writeValue(value: TPickExpOption): void {
    this._pickedValue = value;
    this.cdr.markForCheck();
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  handleChange(index: number) {
    this._pickedValue = this.pickExpOptions[index];
    this._index = index;
    this.markAsTouched();
    this.onChange(this._pickedValue);
    this.pickedValueChange.emit(this._pickedValue);
  }

  get selectedWidth() {
    const total = this.pickExpOptions.length;
    return (100 / total).toFixed(3);
  }

  get offset() {
    return `translateX(${this._index * 100}%)`;
  }

  get isNotSelected() {
    return this._index === null;
  }
}
