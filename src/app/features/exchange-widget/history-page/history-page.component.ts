import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cur-history-page',
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryPageComponent {}
