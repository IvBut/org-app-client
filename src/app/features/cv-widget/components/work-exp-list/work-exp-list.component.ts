import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
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
import { EIconName } from '../../../../shared/models/icon.model';
import { IWorkExpModel, TWorkExpDataForm, TWorkExpModelData } from '../../model/work-exp.model';
import {
  AttachToContainer,
  controlContainerProvider
} from '../attach-to-container/attach-to-container.directive';
import { WorkExpModalComponent } from '../work-exp-modal/work-exp-modal.component';

@Component({
  selector: 'cur-work-exp-list',
  templateUrl: './work-exp-list.component.html',
  styleUrl: './work-exp-list.component.scss',
  viewProviders: [controlContainerProvider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkExpListComponent extends AttachToContainer implements OnInit {
  @Input() initModel?: TNullableType<TWorkExpModelData>[];

  private _formBuilder = inject(FormBuilder);
  private modalService = inject(ModalService);
  protected readonly EIconName = EIconName;
  dragConfig: TExpanderItemDragConfig | undefined = { isDraggable: true };

  get list(): FormArray<TWorkExpDataForm> {
    return this.parentFormGroup.get(this.controlKey) as FormArray<TWorkExpDataForm>;
  }
  ngOnInit() {
    this.registerControl(
      this._formBuilder.array(
        this.initModel?.length
          ? this.initModel.map(item => {
              return this._formBuilder.group({
                company: [item?.company ?? ''],
                jobPosition: [item?.jobPosition ?? ''],
                location: [item?.location ?? ''],
                startDate: [item?.startDate ?? null],
                endDate: [item?.endDate ?? null],
                stillWorking: [!!item?.stillWorking],
                description: [item?.description ?? '']
              });
            })
          : []
      )
    );
  }
  private openModal(
    mode: 'create' | 'edit',
    initData: TNullableType<IWorkExpModel>,
    index?: TNullableType<number>
  ) {
    this.modalService
      .openModal(
        WorkExpModalComponent,
        {
          size: EModalSize.LARGE,
          disableClose: true,
          modalData: initData,
          caption: mode === 'create' ? 'Добавить опыт работы' : 'Редактировать опыт работы'
        },
        {
          autoFocus: false
        }
      )
      .closed.subscribe((data: TNullableType<TWorkExpModelData>) => {
        if (data) {
          if (mode === 'create') {
            this.list.push(
              this._formBuilder.group({
                company: [data?.company ?? ''],
                jobPosition: [data?.jobPosition ?? ''],
                location: [data?.location ?? ''],
                startDate: [data?.startDate ?? null],
                endDate: [data?.endDate ?? null],
                stillWorking: [!!data?.stillWorking],
                description: [data?.description ?? '']
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
    this.openModal('edit', group.value as unknown as IWorkExpModel, idx);
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
