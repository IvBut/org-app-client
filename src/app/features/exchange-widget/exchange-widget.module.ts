import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExchangeComponent } from './exchange.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { TodayPageComponent } from './today-page/today-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'today',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ExchangeComponent,
    children: [
      {
        path: 'today',
        component: TodayPageComponent
      },
      {
        path: 'history',
        component: HistoryPageComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'today'
  }
];

@NgModule({
  declarations: [TodayPageComponent, HistoryPageComponent, ExchangeComponent],
  imports: [RouterModule.forChild(routes), CommonModule]
})
export class ExchangeWidgetModule {}
