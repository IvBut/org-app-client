import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCvPageComponent } from './components/create-cv-page/create-cv-page.component';
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
  declarations: [CvComponent, CreateCvPageComponent],
  imports: [RouterModule.forChild(routes), CommonModule]
})
export class CvWidgetModule {}
