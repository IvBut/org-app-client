import { TCVWizardDataForm } from '../model/cv.model';

export const createCvDTO = (form: TCVWizardDataForm): FormData => {
  const formData = new FormData();
  const file = form.controls.personalData?.controls?.photo?.value;
  if (file) {
    formData.append('photo', file, file.name);
  }
  const data = form.getRawValue();
  formData.append('cvData', JSON.stringify(data));
  return formData;
};
