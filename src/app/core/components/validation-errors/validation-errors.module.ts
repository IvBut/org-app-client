import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { ValidationErrorsComponent } from './validation-errors.component';

@NgModule({
  declarations: [ValidationErrorsComponent],
  imports: [CommonModule, MatError],
  exports: [ValidationErrorsComponent]
})
export class ValidationErrorsModule {}
