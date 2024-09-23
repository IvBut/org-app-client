import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  inject
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

  @Output() dropEnd = new EventEmitter<CdkDragDrop<any>>();

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

  drop(event: CdkDragDrop<any, any>) {
    moveItemInArray(this.expanderItems.toArray(), event.previousIndex, event.currentIndex);
    this.dropEnd && this.dropEnd.emit(event);
  }
}
