import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { IconSizeModule } from '../../directives/icon-size/icon-size/icon-size.module';
import { AddListBtnComponent } from './add-list-btn.component';

@NgModule({
  declarations: [AddListBtnComponent],
  exports: [AddListBtnComponent],
  imports: [CommonModule, IconSizeModule, MatButton, MatDivider, MatIcon]
})
export class AddListBtnModule {}
