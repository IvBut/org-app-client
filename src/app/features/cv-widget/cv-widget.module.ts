import { CdkDrag, CdkDragHandle, CdkDragPlaceholder, CdkDropList } from '@angular/cdk/drag-drop';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatChip, MatChipSet } from '@angular/material/chips';
import {
  MatDateRangeInput,
  MatDateRangePicker,
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
  MatEndDate,
  MatStartDate
} from '@angular/material/datepicker';
import { MatDivider } from '@angular/material/divider';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {
  MatStep,
  MatStepLabel,
  MatStepper,
  MatStepperNext,
  MatStepperPrevious
} from '@angular/material/stepper';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { QuillEditorComponent, QuillViewHTMLComponent } from 'ngx-quill';
import { ModalModule } from '../../core/components/modal/modal.module';
import { ValidationErrorsModule } from '../../core/components/validation-errors/validation-errors.module';
import { CorePipesModule } from '../../core/pipes/core-pipes.module';
import { AddListBtnModule } from '../../shared/components/add-list-btn/add-list-btn.module';
import { ExpanderModule } from '../../shared/components/expander/expander.module';
import { PickExperienceModule } from '../../shared/components/pick-experience/pick-experience.module';
import { IconSizeModule } from '../../shared/directives/icon-size/icon-size/icon-size.module';
import { AdditionalInfoComponent } from './components/additional-info/additional-info.component';
import { InfoHeaderComponent } from './components/additional-info/info-header/info-header.component';
import { CreateCvPageComponent } from './components/create-cv-page/create-cv-page.component';
import { EducationListComponent } from './components/education-list/education-list.component';
import { EducationFormComponent } from './components/education-modal/education-form/education-form.component';
import { EducationModalComponent } from './components/education-modal/education-modal.component';
import { LanguageFormComponent } from './components/language-modal/language-form/language-form.component';
import { LanguageModalComponent } from './components/language-modal/language-modal.component';
import { LanguagesListComponent } from './components/languages-list/languages-list.component';
import { LinksListComponent } from './components/links-list/links-list.component';
import { LinkFormComponent } from './components/links-modal/link-form/link-form.component';
import { LinksModalComponent } from './components/links-modal/links-modal.component';
import { PersonalDataFormComponent } from './components/personal-data-form/personal-data-form.component';
import { UploadPhotoComponent } from './components/personal-data-form/upload-photo/upload-photo.component';
import { ProfileDataFormComponent } from './components/profile-data-form/profile-data-form.component';
import { SectionSettingsModalComponent } from './components/section-settings-modal/section-settings-modal.component';
import { SkillsListComponent } from './components/skills-list/skills-list.component';
import { SkillsFormComponent } from './components/skills-modal/skills-form/skills-form.component';
import { SkillsModalComponent } from './components/skills-modal/skills-modal.component';
import { WorkExpListComponent } from './components/work-exp-list/work-exp-list.component';
import { WorkExpFormComponent } from './components/work-exp-modal/work-exp-form/work-exp-form.component';
import { WorkExpModalComponent } from './components/work-exp-modal/work-exp-modal.component';
import { CvComponent } from './cv.component';
import { CvApiService } from './services/cv-api.service';

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
    UploadPhotoComponent,
    WorkExpListComponent,
    WorkExpModalComponent,
    WorkExpFormComponent,
    EducationListComponent,
    EducationFormComponent,
    EducationModalComponent,
    AdditionalInfoComponent,
    InfoHeaderComponent,
    SectionSettingsModalComponent,
    SkillsListComponent,
    SkillsModalComponent,
    SkillsFormComponent,
    ProfileDataFormComponent,
    LanguagesListComponent,
    LanguageModalComponent,
    LanguageFormComponent,
    LinksListComponent,
    LinksModalComponent,
    LinkFormComponent
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
    MatDatepickerToggle,
    ModalModule,
    MatDivider,
    MatIconButton,
    ExpanderModule,
    CorePipesModule,
    MatDateRangeInput,
    MatEndDate,
    MatStartDate,
    MatDateRangePicker,
    MatFabButton,
    QuillEditorComponent,
    QuillViewHTMLComponent,
    MatCardHeader,
    CdkDragHandle,
    MatSlideToggle,
    AddListBtnModule,
    PickExperienceModule,
    MatRadioGroup,
    MatRadioButton,
    MatChipSet,
    CdkDropList,
    MatChip,
    CdkDrag,
    MatAccordion,
    MatExpansionPanel,
    CdkDragPlaceholder
  ],
  providers: [CvApiService]
})
export class CvWidgetModule {}
