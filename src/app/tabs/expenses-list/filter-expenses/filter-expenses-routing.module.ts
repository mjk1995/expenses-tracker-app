import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FilterExpensesPage } from "./filter-expenses.page";

const routes: Routes = [
  {
    path: "",
    component: FilterExpensesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterExpensesPageRoutingModule {}
