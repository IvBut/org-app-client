import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Output
} from '@angular/core';
import { combineLatest, map, Observable, take, timer } from 'rxjs';
import { TNull } from '../../../../../core/models/types';
import { EIconName } from '../../../../../shared/models/icon.model';

enum EUploadPhotoStatus {
  INIT = 'INIT',
  UPLOADING = 'UPLOADING',
  UPLOADED = 'UPLOADED',
  ERROR = 'ERROR'
}

@Component({
  selector: 'cur-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrl: './upload-photo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadPhotoComponent {
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  protected readonly EUploadPhotoStatus = EUploadPhotoStatus;
  protected readonly EIconName = EIconName;
  status: EUploadPhotoStatus = EUploadPhotoStatus.INIT;
  file: File | null = null;
  fileUrl = '';
  @Output() fileChange = new EventEmitter<TNull<File>>();

  private resetFile(status: EUploadPhotoStatus) {
    this.file = null;
    this.fileChange.emit(null);
    this.fileUrl = '';
    this.status = status;
    this.cdr.markForCheck();
  }
  onChange(files: File[]) {
    const file: File = files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const uploading$ = new Observable<{
        newStatus: EUploadPhotoStatus.UPLOADED | EUploadPhotoStatus.ERROR;
        data?: string;
      }>(observer => {
        reader.onload = e => {
          observer.next({
            newStatus: EUploadPhotoStatus.UPLOADED,
            data: `url(${e.target.result})`
          });
          observer.complete();
        };

        reader.onerror = () => {
          observer.next({ newStatus: EUploadPhotoStatus.ERROR });
          observer.complete();
        };
      });
      this.status = EUploadPhotoStatus.UPLOADING;
      this.cdr.markForCheck();
      combineLatest([timer(1000), uploading$])
        .pipe(
          take(1),
          map(el => el[1])
        )
        .subscribe(({ newStatus, data }) => {
          this.status = newStatus;
          if (newStatus === EUploadPhotoStatus.UPLOADED) {
            this.fileUrl = data;
            this.file = file;
            this.fileChange.emit(file);
          } else {
            this.resetFile(EUploadPhotoStatus.ERROR);
          }
          this.cdr.markForCheck();
        });
    } else {
      this.resetFile(EUploadPhotoStatus.ERROR);
    }
  }
  handleClear() {
    this.resetFile(EUploadPhotoStatus.INIT);
  }
}
