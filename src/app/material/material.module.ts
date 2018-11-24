import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatGridListModule} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatGridListModule
  ],
  exports: [
    MatGridListModule
  ]
})
export class MaterialModule { }
