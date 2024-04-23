import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cur-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {}
