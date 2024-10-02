import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
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
import { IWorkExpModel, TWorkExpDataForm } from '../../model/work-exp.model';
import { WorkExpModalComponent } from '../work-exp-modal/work-exp-modal.component';

@Component({
  selector: 'cur-work-exp-list',
  templateUrl: './work-exp-list.component.html',
  styleUrl: './work-exp-list.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkExpListComponent implements OnInit, OnDestroy {
  @Input({ required: true }) controlKey = '';

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _formBuilder = inject(FormBuilder);
  private modalService = inject(ModalService);
  protected readonly EIconName = EIconName;
  parentContainer = inject(ControlContainer);
  dragConfig: TExpanderItemDragConfig | undefined = { isDraggable: true };

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  get list(): FormArray<TWorkExpDataForm> {
    return this.parentFormGroup.get(this.controlKey) as FormArray<TWorkExpDataForm>;
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
      .closed.subscribe((data: TNullableType<FormGroup<IWorkExpModel>>) => {
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
