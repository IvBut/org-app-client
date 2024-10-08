import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder } from '@angular/forms';
import { ModalService } from '../../../../core/components/modal/services/modal.service';
import { EModalSize } from '../../../../core/models/modal.model';
import { TNullableType } from '../../../../core/models/types';
import { moveItemInFormArray } from '../../../../core/utils/formUtils';
import {
  EExpanderItemAction,
  TExpanderItemActionOutput,
  TExpanderItemDragConfig
} from '../../../../shared/components/expander/models/expander.model';
import { TEducationDataForm, TEducationModelData } from '../../model/education.model';
import {
  AttachToContainer,
  controlContainerProvider
} from '../attach-to-container/attach-to-container.directive';
import { EducationModalComponent } from '../education-modal/education-modal.component';

@Component({
  selector: 'cur-education-list',
  templateUrl: './education-list.component.html',
  styleUrl: './education-list.component.scss',
  viewProviders: [controlContainerProvider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationListComponent extends AttachToContainer implements OnInit, OnDestroy {
  @Input() initModel?: TNullableType<TEducationModelData>[];

  private _formBuilder = inject(FormBuilder);
  private modalService = inject(ModalService);
  private destroyRef = inject(DestroyRef);
  dragConfig: TExpanderItemDragConfig | undefined = { isDraggable: true };

  get list(): FormArray<TEducationDataForm> {
    return this.childControl as FormArray<TEducationDataForm>;
  }

  ngOnInit() {
    this.registerControl(
      this._formBuilder.array(
        this.initModel?.length
          ? this.initModel.map(item => {
              return this._formBuilder.group({
                institution: [item?.institution ?? ''],
                degree: [item?.degree ?? ''],
                location: [item?.location ?? ''],
                description: [item?.description ?? ''],
                startYear: [item?.startYear ?? null],
                endYear: [item?.endYear ?? null]
              });
            })
          : []
      )
    );
  }

  ngOnDestroy() {
    this.unRegisterControl();
  }

  private openModal(
    mode: 'create' | 'edit',
    initData: TNullableType<TEducationModelData>,
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
      .subscribe((data: TNullableType<TEducationModelData>) => {
        if (data) {
          if (mode === 'create') {
            this.list.push(
              this._formBuilder.group({
                institution: [data?.institution ?? ''],
                degree: [data?.degree ?? ''],
                location: [data?.location ?? ''],
                description: [data?.description ?? ''],
                startYear: [data?.startYear ?? null],
                endYear: [data?.endYear ?? null]
              })
            );
          } else {
            this.list.at(index).patchValue(data);
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
    this.openModal('edit', group.value as TEducationModelData, idx);
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
