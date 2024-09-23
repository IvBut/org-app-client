export enum EValidationErrors {
  REQUIRED = 'required',
  EMAIL = 'email'
}

export const VALIDATION_ERRORS = {
  [EValidationErrors.REQUIRED]: () => 'Поле обязательно для заполнения',
  [EValidationErrors.EMAIL]: () => 'Введите корректный email'
};
