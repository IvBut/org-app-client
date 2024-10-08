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
import { ExtractFormControl, TNullableType } from '../../../../core/models/types';
import { moveItemInFormArray } from '../../../../core/utils/formUtils';
import {
  EExpanderItemAction,
  TExpanderItemActionOutput,
  TExpanderItemDragConfig
} from '../../../../shared/components/expander/models/expander.model';
import { TLanguageDataForm, TLanguageGroupModelData } from '../../model/languages.model';
import {
  AttachToContainer,
  controlContainerProvider
} from '../attach-to-container/attach-to-container.directive';
import { TLangFormGroup } from '../language-modal/language-form/language-form.component';
import { LanguageModalComponent } from '../language-modal/language-modal.component';

@Component({
  selector: 'cur-languages-list',
  templateUrl: './languages-list.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  viewProviders: [controlContainerProvider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguagesListComponent extends AttachToContainer implements OnInit, OnDestroy {
  @Input() initModel?: TNullableType<TLanguageGroupModelData>[];

  private _formBuilder = inject(FormBuilder);
  private modalService = inject(ModalService);
  private destroyRef = inject(DestroyRef);
  dragConfig: TExpanderItemDragConfig | undefined = { isDraggable: true };

  get list(): FormArray<TLanguageDataForm> {
    return this.childControl as FormArray<TLanguageDataForm>;
  }
  ngOnInit(): void {
    this.registerControl(
      this._formBuilder.array(
        this.initModel?.length
          ? this.initModel.map(item => {
              return this._formBuilder.group({
                language: [item?.language ?? ''],
                level: [item?.level ?? null]
              });
            })
          : []
      )
    );
  }

  private openModal(
    mode: 'create' | 'edit',
    initData: TNullableType<TLanguageGroupModelData>,
    index?: TNullableType<number>
  ) {
    this.modalService
      .openModal(
        LanguageModalComponent,
        {
          size: EModalSize.MEDIUM,
          disableClose: true,
          modalData: initData,
          caption: mode === 'create' ? 'Добавить язык' : 'Редактировать язык'
        },
        {
          autoFocus: false
        }
      )
      .closed.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: TNullableType<ExtractFormControl<TLangFormGroup>>) => {
        if (data) {
          if (mode === 'create') {
            this.list.push(
              this._formBuilder.group({
                language: [data.language],
                level: [data.level.value]
              })
            );
          } else {
            this.list.at(index).patchValue({
              language: data.language,
              level: data.level.value
            });
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
    this.openModal('edit', group.value as TLanguageGroupModelData, idx);
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

  ngOnDestroy() {
    this.unRegisterControl();
  }
}
