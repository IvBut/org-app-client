import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalService } from '../../../../core/components/modal/services/modal.service';
import { EModalSize } from '../../../../core/models/modal.model';
import { ExtractFormControl, TNullableType } from '../../../../core/models/types';
import { moveItemInFormArray } from '../../../../core/utils/formUtils';
import { TExpanderItemDragConfig } from '../../../../shared/components/expander/models/expander.model';
import {
  ISkillModel,
  SKILLS_TYPE_MAP,
  TISKillsGroupModelData,
  TSkillsDataForm
} from '../../model/skill.model';
import {
  AttachToContainer,
  controlContainerProvider
} from '../attach-to-container/attach-to-container.directive';
import { TSkillFormGroup } from '../skills-modal/skills-form/skills-form.component';
import { SkillsModalComponent } from '../skills-modal/skills-modal.component';

@Component({
  selector: 'cur-skills-list',
  templateUrl: './skills-list.component.html',
  styleUrl: './skills-list.component.scss',
  viewProviders: [controlContainerProvider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsListComponent extends AttachToContainer implements OnInit {
  @Input() initModel?: TNullableType<TISKillsGroupModelData>[];
  private _formBuilder = inject(FormBuilder);
  private modalService = inject(ModalService);
  private destroyRef = inject(DestroyRef);
  dragConfig: TExpanderItemDragConfig | undefined = { isDraggable: true };

  get list(): FormArray<TSkillsDataForm> {
    return this.childControl as FormArray<TSkillsDataForm>;
  }

  typeLabel = (type: string) => {
    return SKILLS_TYPE_MAP[type];
  };
  ngOnInit() {
    this.registerControl(
      this._formBuilder.array(
        this.initModel?.length
          ? this.initModel.map(el => {
              return this._formBuilder.group({
                type: [el.type],
                data: this._formBuilder.array(
                  el?.data?.length
                    ? el.data.map(skill => {
                        return this._formBuilder.group({
                          name: [skill?.name || ''],
                          level: [skill?.level ?? null]
                        });
                      })
                    : []
                )
              });
            })
          : []
      )
    );
    this.cdr.markForCheck();
  }

  handleAdd() {
    this.modalService
      .openModal(
        SkillsModalComponent,
        {
          size: EModalSize.MEDIUM,
          disableClose: true,
          modalData: null,
          caption: 'Добавить навык'
        },
        {
          autoFocus: false
        }
      )
      .closed.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: TNullableType<ExtractFormControl<TSkillFormGroup>>) => {
        if (data) {
          const type = data.type;
          const control = this.list.controls.find(el => el.controls.type.value === type);
          if (control) {
            control.controls.data.push(
              new FormGroup<ISkillModel>({
                name: new FormControl(data.name),
                level: new FormControl(data.level?.value)
              })
            );
            this.cdr.markForCheck();
          }
        }
      });
  }

  handleEdit(outerType: string, data: TISKillsGroupModelData, index: number) {
    this.modalService
      .openModal(
        SkillsModalComponent,
        {
          size: EModalSize.MEDIUM,
          disableClose: true,
          modalData: { ...data, type: outerType },
          caption: 'Редактирова навык'
        },
        {
          autoFocus: false
        }
      )
      .closed.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: TNullableType<ExtractFormControl<TSkillFormGroup>>) => {
        if (data) {
          const type = data.type;
          const control = this.list.controls.find(el => el.controls.type.value === type);
          if (control) {
            if (outerType !== type) {
              const controlForDelete = this.list.controls.find(
                el => el.controls.type.value === outerType
              );
              controlForDelete?.controls?.data?.removeAt(index);
              control.controls.data.push(
                new FormGroup<ISkillModel>({
                  name: new FormControl(data.name),
                  level: new FormControl(data.level?.value)
                })
              );
            } else {
              control.controls.data.at(index).patchValue({
                name: data.name,
                level: data.level?.value
              });
            }
            this.cdr.markForCheck();
          }
        }
      });
  }

  drop(event: CdkDragDrop<any>, list: FormArray<any>) {
    moveItemInFormArray(list, event.previousIndex, event.currentIndex);
    this.cdr.markForCheck();
  }

  handleDelete(type: string, event: MouseEvent, idx: number) {
    event.stopPropagation();
    const control = this.list.controls.find(el => el.controls.type.value === type);
    if (control) {
      control.controls.data.removeAt(idx);
      this.cdr.markForCheck();
    }
  }
}
