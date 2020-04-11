import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NewExpensePageRoutingModule } from "./new-expense-routing.module";

import { NewExpensePage } from "./new-expense.page";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NewExpensePageRoutingModule,
    SharedModule,
  ],
  declarations: [NewExpensePage],
})
export class NewExpensePageModule {}
