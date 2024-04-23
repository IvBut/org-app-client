import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cur-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent {}
