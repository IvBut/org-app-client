import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatOption, MatSelect } from '@angular/material/select';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { ExchangeComponent } from './exchange.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { ExchangeService } from './services/exchange.service';
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
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatSelect,
    MatOption,
    MatFormFieldModule
  ],
  providers: [ExchangeService]
})
export class ExchangeWidgetModule {}
