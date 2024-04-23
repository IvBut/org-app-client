import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [WelcomeComponent],
  imports: [RouterModule.forChild(routes), CommonModule]
})
export class HomeWidgetModule {}
