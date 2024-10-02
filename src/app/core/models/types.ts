import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type TNull<T> = T | null;
export type TUndefined<T> = T | undefined;
export type TNullableType<T> = TNull<T> | TUndefined<T>;

export type ExtractFormControl<T> = {
  [K in keyof T]: T[K] extends FormControl<infer U>
    ? U
    : T[K] extends FormControl<infer U> | undefined
      ? U | undefined
      : T[K] extends FormArray<FormControl<infer U>>
        ? Array<U>
        : T[K] extends FormArray<FormControl<infer U>> | undefined
          ? Array<U> | undefined
          : T[K] extends FormArray<FormGroup<infer U>>
            ? Array<Partial<ExtractFormControl<U>>>
            : T[K] extends FormArray<FormGroup<infer U>> | undefined
              ? Array<Partial<ExtractFormControl<U>>> | undefined
              : T[K] extends FormGroup<infer U>
                ? Partial<ExtractFormControl<U>>
                : T[K] extends FormGroup<infer U> | undefined
                  ? Partial<ExtractFormControl<U>> | undefined
                  : T[K];
};
