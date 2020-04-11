import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ExpensesDetailPage } from "./expenses-detail.page";

const routes: Routes = [
  {
    path: "",
    component: ExpensesDetailPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensesDetailPageRoutingModule {}
