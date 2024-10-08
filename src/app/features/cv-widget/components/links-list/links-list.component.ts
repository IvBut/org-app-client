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
import { TLinkDataForm, TLinkModelData } from '../../model/link.model';
import {
  AttachToContainer,
  controlContainerProvider
} from '../attach-to-container/attach-to-container.directive';
import { LinksModalComponent } from '../links-modal/links-modal.component';

@Component({
  selector: 'cur-links-list',
  templateUrl: './links-list.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  viewProviders: [controlContainerProvider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinksListComponent extends AttachToContainer implements OnInit, OnDestroy {
  @Input() initModel?: TNullableType<TLinkModelData>[];

  private _formBuilder = inject(FormBuilder);
  private modalService = inject(ModalService);
  private destroyRef = inject(DestroyRef);
  dragConfig: TExpanderItemDragConfig | undefined = { isDraggable: true };

  get list(): FormArray<TLinkDataForm> {
    return this.childControl as FormArray<TLinkDataForm>;
  }

  ngOnInit() {
    this.registerControl(
      this._formBuilder.array(
        this.initModel?.length
          ? this.initModel.map(item => {
              return this._formBuilder.group({
                label: [item?.label ?? ''],
                link: [item?.link ?? '']
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
    initData: TNullableType<TLinkModelData>,
    index?: TNullableType<number>
  ) {
    this.modalService
      .openModal(
        LinksModalComponent,
        {
          size: EModalSize.MEDIUM,
          disableClose: true,
          modalData: initData,
          caption: mode === 'create' ? 'Добавить ссылку' : 'Редактировать ссылку'
        },
        {
          autoFocus: false
        }
      )
      .closed.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: TNullableType<TLinkModelData>) => {
        if (data) {
          if (mode === 'create') {
            this.list.push(
              this._formBuilder.group({
                label: [data?.label ?? ''],
                link: [data?.link ?? '']
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
    this.openModal('edit', group.value as TLinkModelData, idx);
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
