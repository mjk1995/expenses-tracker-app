import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { FilterExpensesPageRoutingModule } from "./filter-expenses-routing.module";

import { FilterExpensesPage } from "./filter-expenses.page";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FilterExpensesPageRoutingModule,
  ],
  declarations: [FilterExpensesPage],
})
export class FilterExpensesPageModule {}
