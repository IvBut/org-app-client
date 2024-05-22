import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { IconSizeModule } from '../../directives/icon-size/icon-size/icon-size.module';
import { TableBlockComponent } from './table-block.component';
import { MatButton } from '@angular/material/button';

@NgModule({
  declarations: [TableBlockComponent],
  exports: [TableBlockComponent],
  imports: [MatIcon, NgStyle, IconSizeModule, NgIf, NgForOf, MatButton]
})
export class TableBlockModule {}
