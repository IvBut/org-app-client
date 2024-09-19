import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateFormatPipe } from './date-format.pipe';

@NgModule({
  declarations: [DateFormatPipe],
  exports: [DateFormatPipe],
  imports: [CommonModule]
})
export class CorePipesModule {}
