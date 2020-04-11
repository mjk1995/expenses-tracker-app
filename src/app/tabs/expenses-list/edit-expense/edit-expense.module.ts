import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EditExpensePageRoutingModule } from "./edit-expense-routing.module";

import { EditExpensePage } from "./edit-expense.page";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditExpensePageRoutingModule,
    SharedModule,
  ],
  declarations: [EditExpensePage],
})
export class EditExpensePageModule {}
