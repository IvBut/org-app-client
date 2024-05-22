import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { CommonModule } from '@angular/common';
import { IconSizeModule } from '../../directives/icon-size/icon-size/icon-size.module';
import { ThemeService } from '../../services/themeService';
import { ThemeSwitcherComponent } from './theme-switcher.component';

@NgModule({
  declarations: [ThemeSwitcherComponent],
  imports: [MatButtonModule, MatIconModule, MatMenuModule, IconSizeModule, CommonModule],
  providers: [ThemeService],
  exports: [ThemeSwitcherComponent]
})
export class ThemeSwitcherModule {}
