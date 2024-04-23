import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cur-today-page',
  templateUrl: './today-page.component.html',
  styleUrl: './today-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodayPageComponent {}
