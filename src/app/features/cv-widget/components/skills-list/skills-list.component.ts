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
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
import { TSkillFormGroup } from '../skills-modal/skills-form/skills-form.component';
import { SkillsModalComponent } from '../skills-modal/skills-modal.component';

@Component({
  selector: 'cur-skills-list',
  templateUrl: './skills-list.component.html',
  styleUrl: './skills-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsListComponent implements OnInit, OnDestroy {
  @Input({ required: true }) controlKey = '';
  @Input() initModel?: TNullableType<TISKillsGroupModelData>[];
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _formBuilder = inject(FormBuilder);
  private modalService = inject(ModalService);
  private destroyRef = inject(DestroyRef);
  parentContainer = inject(ControlContainer);
  dragConfig: TExpanderItemDragConfig | undefined = { isDraggable: true };

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  get list(): FormArray<TSkillsDataForm> {
    return this.parentFormGroup.get(this.controlKey) as FormArray<TSkillsDataForm>;
  }

  typeLabel = (type: string) => {
    return SKILLS_TYPE_MAP[type];
  };
  ngOnInit() {
    this.parentFormGroup.addControl(
      this.controlKey,
      this._formBuilder.array(
        this.initModel?.length
          ? this.initModel.map(el => {
              return new FormGroup({
                type: new FormControl(el.type),
                data: this._formBuilder.array(
                  el?.data?.length
                    ? el.data.map(skill => {
                        return new FormGroup({
                          name: new FormControl(skill?.name || ''),
                          level: new FormControl(skill?.level ?? null)
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

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
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
