import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  Input
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { ModalService } from '../../../../../core/components/modal/services/modal.service';
import { EModalSize } from '../../../../../core/models/modal.model';
import { TNullableType } from '../../../../../core/models/types';
import { EIconName } from '../../../../../shared/models/icon.model';
import {
  ESectionId,
  ISectionSettings,
  TSectionSettingsModelData
} from '../../../model/section.model';
import { SectionSettingsModalComponent } from '../../section-settings-modal/section-settings-modal.component';

@Component({
  selector: 'cur-info-header',
  templateUrl: './info-header.component.html',
  styleUrl: './info-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoHeaderComponent {
  @Input() settings: FormGroup<ISectionSettings>;

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private modalService = inject(ModalService);
  private destroyRef = inject(DestroyRef);

  protected readonly ICON_MAP = {
    [ESectionId.WORK_EXPERIENCE]: EIconName.WORK,
    [ESectionId.EDUCATION]: EIconName.SCHOOL,
    [ESectionId.SKILLS]: EIconName.SKILL,
    [ESectionId.PROFILE]: EIconName.PERSON,
    [ESectionId.LANGUAGES]: EIconName.LANGUAGE,
    [ESectionId.LINKS]: EIconName.SHARE
  };

  get sectionId() {
    return this.settings.controls.sectionId.value;
  }

  protected readonly EIconName = EIconName;

  changeSettings() {
    this.modalService
      .openModal(SectionSettingsModalComponent, {
        size: EModalSize.MEDIUM,
        disableClose: true,
        modalData: this.settings.value,
        caption: 'Настройка раздела'
      })
      .closed.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: TNullableType<TSectionSettingsModelData>) => {
        if (data) {
          this.settings.setValue(data);
          this.cdr.markForCheck();
        }
      });
  }
}
