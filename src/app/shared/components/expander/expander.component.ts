import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  DestroyRef,
  inject,
  Input,
  QueryList
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ExpanderItemComponent } from './expander-item/expander-item.component';
import { IExpanderItemAction } from './models/expander.model';

@Component({
  selector: 'cur-expander',
  templateUrl: './expander.component.html',
  styleUrl: './expander.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpanderComponent implements AfterViewInit {
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef);

  @Input()
  multi: boolean = false;

  @Input()
  isSeparated: boolean = false;

  @ContentChildren(ExpanderItemComponent) expanderItems: QueryList<ExpanderItemComponent>;

  handleActionClick(event: MouseEvent, index: number, btn: IExpanderItemAction) {
    event.stopPropagation();
    const action = this.expanderItems.get(index).actionClick;
    action && action.emit({ btnName: btn.btnName, index });
  }

  ngAfterViewInit(): void {
    this.expanderItems.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.cdr.markForCheck();
    });
  }
}
