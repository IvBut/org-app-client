import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelect } from '@angular/material/select';
import {
  MatStep,
  MatStepLabel,
  MatStepper,
  MatStepperNext,
  MatStepperPrevious
} from '@angular/material/stepper';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { ValidationErrorsModule } from '../../core/components/validation-errors/validation-errors.module';
import { IconSizeModule } from '../../shared/directives/icon-size/icon-size/icon-size.module';
import { CreateCvPageComponent } from './components/create-cv-page/create-cv-page.component';
import { PersonalDataFormComponent } from './components/personal-data-form/personal-data-form.component';
import { UploadPhotoComponent } from './components/personal-data-form/upload-photo/upload-photo.component';
import { CvComponent } from './cv.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full'
  },
  {
    path: '',
    component: CvComponent,
    children: [
      {
        path: 'create',
        component: CreateCvPageComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'create'
  }
];

@NgModule({
  declarations: [
    CvComponent,
    CreateCvPageComponent,
    PersonalDataFormComponent,
    UploadPhotoComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatStepper,
    MatStep,
    MatStepLabel,
    MatButton,
    MatStepperNext,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperPrevious,
    MatCard,
    MatCardContent,
    MatIcon,
    IconSizeModule,
    NgOptimizedImage,
    MatProgressSpinner,
    MatCheckbox,
    ValidationErrorsModule,
    NgxMaskDirective,
    MatOption,
    MatSelect,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle
  ]
})
export class CvWidgetModule {}
