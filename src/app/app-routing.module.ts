import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home-widget/home-widget.module').then(m => m.HomeWidgetModule)
  },
  {
    path: 'exchange',
    loadChildren: () =>
      import('./features/exchange-widget/exchange-widget.module').then(m => m.ExchangeWidgetModule)
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./features/settings-widget/settings-widget.module').then(m => m.SettingsWidgetModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
