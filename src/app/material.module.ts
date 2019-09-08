import { NgModule } from "@angular/core";

import {
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";
import { FormsModule } from "@angular/forms";

@NgModule({
  exports: [
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class MaterialModule {}
