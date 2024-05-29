import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatChip, MatChipListbox, MatChipOption, MatChipSet } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatOption, MatSelect } from '@angular/material/select';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { TableBlockModule } from '../../shared/components/table-block/table-block.module';
import { IconSizeModule } from '../../shared/directives/icon-size/icon-size/icon-size.module';
import { DateFilterComponent } from './components/history-page/date-filter/date-filter.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { TodayPageComponent } from './components/today-page/today-page.component';
import { ExchangeComponent } from './exchange.component';
import { ExchangeService } from './services/exchange.service';

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
  declarations: [TodayPageComponent, HistoryPageComponent, ExchangeComponent, DateFilterComponent],
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
    MatFormFieldModule,
    MatNoDataRow,
    MatProgressSpinner,
    MatIcon,
    TableBlockModule,
    MatIconButton,
    IconSizeModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipSet,
    MatChip,
    MatChipOption,
    MatChipListbox,
    MatButton,
    MatMiniFabButton,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatInput
  ],
  providers: [ExchangeService]
})
export class ExchangeWidgetModule {}
