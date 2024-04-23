import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';

import { IThemeSwitcherOption, TThemeMenuPosition } from '../../models/theme-switcher.model';
import { ThemeService } from '../../services/themeService';

const DEFAULT_POSITION: TThemeMenuPosition = { x: 'before', y: 'below' };

@Component({
  selector: 'cur-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSwitcherComponent implements OnInit {
  private themeService: ThemeService = inject(ThemeService);

  $themeOptions = this.themeService
    .getThemeOptions()
    .pipe(catchError(() => of([] as IThemeSwitcherOption[])));

  @Input({
    required: false,
    transform: (value?: TThemeMenuPosition | null) => {
      if (!value) return DEFAULT_POSITION;
      return { ...DEFAULT_POSITION, ...value };
    }
  })
  position: TThemeMenuPosition = DEFAULT_POSITION;

  ngOnInit() {
    this.themeService.setTheme('deeppurple-amber');
  }

  changeTheme(name: string) {
    this.themeService.setTheme(name);
  }
}
