import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ThemeService } from '../../services/themeService';
import { ThemeSwitcherComponent } from './theme-switcher.component';

@NgModule({
  declarations: [ThemeSwitcherComponent],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [ThemeService],
  exports: [ThemeSwitcherComponent]
})
export class ThemeSwitcherModule {}
