import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Host,
  inject,
  Input,
  OnInit,
  Optional,
  SkipSelf
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { merge } from 'rxjs';
import { VALIDATION_ERRORS } from '../../models/validation';
import { extractTouchedChanges } from '../../utils/controlUtils';

@Component({
  selector: 'cur-validation-errors',
  templateUrl: './validation-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationErrorsComponent implements OnInit {
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private control: AbstractControl;
  private readonly JSON = JSON;
  private destroyRef = inject(DestroyRef);
  errorsList: string[] = [];

  @Input({ required: true }) controlKey: string;
  @Input() configForErrors?: {
    [key: string]: (control: AbstractControl, errorValue: unknown) => string;
  };

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer
  ) {}

  ngOnInit(): void {
    this.control = this.controlContainer.control.get(this.controlKey);
    merge(
      extractTouchedChanges(this.control),
      this.control.statusChanges,
      this.control.valueChanges
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    const errors = this.control?.errors;
    const keys = errors ? Object.keys(errors) : [];
    const newErrors: string[] = [];
    const errorsConfig = this.configForErrors || {};
    if (keys.length) {
      for (const k of keys) {
        const errorFromConfig = errorsConfig[k];
        const errorValue = errors[k];
        const defaultError = VALIDATION_ERRORS[k]?.(this.control, errorValue);
        newErrors.push(
          errorFromConfig
            ? errorFromConfig(this.control, errorValue)
            : defaultError
              ? defaultError
              : JSON.stringify(errorValue)
        );
      }
    }
    this.errorsList = newErrors;
    this.cdr.markForCheck();
  }
}
