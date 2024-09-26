import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PickExperienceComponent } from './pick-experience.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [PickExperienceComponent],
  exports: [PickExperienceComponent]
})
export class PickExperienceModule {}
