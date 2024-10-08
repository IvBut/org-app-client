import { FormControl, FormGroup } from '@angular/forms';
import { ExtractFormControl } from '../../../core/models/types';

export interface ILinkModel {
  label: FormControl<string>;
  link: FormControl<string>;
}

export type TLinkModelData = ExtractFormControl<ILinkModel>;
export type TLinkDataForm = FormGroup<ILinkModel>;
