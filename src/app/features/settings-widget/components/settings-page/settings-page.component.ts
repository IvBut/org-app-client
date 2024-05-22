import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cur-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {}
