import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlContainer, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from '../../../../core/components/modal/services/modal.service';
import { EModalSize } from '../../../../core/models/modal.model';
import { TNullableType } from '../../../../core/models/types';
import { moveItemInFormArray } from '../../../../core/utils/formUtils';
import {
  EExpanderItemAction,
  TExpanderItemActionOutput,
  TExpanderItemDragConfig
} from '../../../../shared/components/expander/models/expander.model';
import { EIconName } from '../../../../shared/models/icon.model';
import { IEducationModel, TEducationDataForm } from '../../model/education.model';
import { EducationModalComponent } from '../education-modal/education-modal.component';

@Component({
  selector: 'cur-education-list',
  templateUrl: './education-list.component.html',
  styleUrl: './education-list.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationListComponent implements OnInit, OnDestroy {
  @Input({ required: true }) controlKey = '';

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _formBuilder = inject(FormBuilder);
  private modalService = inject(ModalService);
  private destroyRef = inject(DestroyRef);
  protected readonly EIconName = EIconName;
  parentContainer = inject(ControlContainer);
  dragConfig: TExpanderItemDragConfig | undefined = { isDraggable: true };

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  get list(): FormArray<TEducationDataForm> {
    return this.parentFormGroup.get(this.controlKey) as FormArray<TEducationDataForm>;
  }
  ngOnInit() {
    this.parentFormGroup.addControl(this.controlKey, this._formBuilder.array([]));
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }

  private openModal(
    mode: 'create' | 'edit',
    initData: TNullableType<IEducationModel>,
    index?: TNullableType<number>
  ) {
    this.modalService
      .openModal(
        EducationModalComponent,
        {
          size: EModalSize.LARGE,
          disableClose: true,
          modalData: initData,
          caption: mode === 'create' ? 'Добавить образование' : 'Редактировать образование'
        },
        {
          autoFocus: false
        }
      )
      .closed.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: TNullableType<FormGroup<IEducationModel>>) => {
        if (data) {
          if (mode === 'create') {
            this.list.push(data);
          } else {
            this.list.setControl(index, data);
          }
          this.cdr.markForCheck();
        }
      });
  }

  handleAdd() {
    this.openModal('create', null);
  }

  handleDelete(idx: number) {
    this.list.removeAt(idx);
    this.cdr.markForCheck();
  }

  handleEdit(idx: number) {
    const group = this.list.at(idx);
    this.openModal('edit', group.value as unknown as IEducationModel, idx);
  }

  handleAction({ index, btnName }: TExpanderItemActionOutput) {
    switch (btnName) {
      case EExpanderItemAction.EDIT:
        this.handleEdit(index);
        break;
      case EExpanderItemAction.DELETE:
        this.handleDelete(index);
        break;
    }
  }

  drop(event: CdkDragDrop<any>) {
    moveItemInFormArray(this.list, event.previousIndex, event.currentIndex);
    this.cdr.markForCheck();
  }
}
