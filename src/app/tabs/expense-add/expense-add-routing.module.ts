import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ExpenseAddPage } from "./expense-add.page";

const routes: Routes = [
  {
    path: "",
    component: ExpenseAddPage,
  },
  {
    path: "new-expense",
    loadChildren: () =>
      import("./new-expense/new-expense.module").then(
        (m) => m.NewExpensePageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseAddPageRoutingModule {}
