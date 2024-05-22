import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { catchError, of } from 'rxjs';

import { EIconName, EIconSize } from '../../models/icon.model';
import { IThemeSwitcherOption, TThemeMenuPosition } from '../../models/theme-switcher.model';
import { ThemeService } from '../../services/themeService';

const DEFAULT_POSITION: TThemeMenuPosition = { x: 'before', y: 'below' };

@Component({
  selector: 'cur-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSwitcherComponent {
  private themeService: ThemeService = inject(ThemeService);
  protected readonly EIconName = EIconName;

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
  @Input() paletteSize?: EIconSize = EIconSize.XXXLarge;

  changeTheme(name: string) {
    this.themeService.setTheme(name);
  }
}
