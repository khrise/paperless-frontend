import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatGridListModule, MatTabsModule, MatDialogModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDrawerContainer, MatSidenavModule, MatExpansionModule, MatTableModule, MatSortModule, MatProgressSpinnerModule, MatAutocompleteModule, MatButtonToggleModule, MatPaginatorModule} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatGridListModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatPaginatorModule
  ],
  exports: [
    MatGridListModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
