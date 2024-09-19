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
import { ControlContainer, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from '../../../../core/components/modal/services/modal.service';
import { EModalSize } from '../../../../core/models/modal.model';
import { TNullableType } from '../../../../core/models/types';
import {
  EExpanderItemAction,
  TExpanderItemActionOutput
} from '../../../../shared/components/expander/models/expander.model';
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
  destroyRef = inject(DestroyRef);
  parentContainer = inject(ControlContainer);
  private _formBuilder = inject(FormBuilder);
  private modalService = inject(ModalService);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  get list(): FormArray<TWorkExpDataForm> {
    return this.parentFormGroup.get(this.controlKey) as FormArray<TWorkExpDataForm>;
  }
  ngOnInit() {
    this.parentFormGroup.addControl(this.controlKey, this._formBuilder.array([]));
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
          caption: 'Опыт работы'
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
}
