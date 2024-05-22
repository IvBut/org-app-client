import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatList, MatListItem, MatListSubheaderCssMatStyler } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { ThemeSwitcherModule } from '../../shared/components/theme-switcher/theme-switcher.module';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
@NgModule({
  declarations: [SettingsPageComponent],
  imports: [
    RouterModule.forChild(routes),
    ThemeSwitcherModule,
    CommonModule,
    MatList,
    MatListSubheaderCssMatStyler,
    MatListItem,
    MatDivider
  ]
})
export class SettingsWidgetModule {}
