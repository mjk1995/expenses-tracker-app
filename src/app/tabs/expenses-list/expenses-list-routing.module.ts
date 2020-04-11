import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ExpensesListPage } from "./expenses-list.page";

const routes: Routes = [
  {
    path: "",
    component: ExpensesListPage,
  },
  {
    path: "edit-expense",
    loadChildren: () =>
      import("./edit-expense/edit-expense.module").then(
        (m) => m.EditExpensePageModule
      ),
  },
  {
    path: "expenses-detail",
    loadChildren: () =>
      import("./expenses-detail/expenses-detail.module").then(
        (m) => m.ExpensesDetailPageModule
      ),
  },
  {
    path: "filter-expenses",
    loadChildren: () =>
      import("./filter-expenses/filter-expenses.module").then(
        (m) => m.FilterExpensesPageModule
      ),
  },
  {
    path: "help-page",
    loadChildren: () =>
      import("./help-page/help-page.module").then((m) => m.HelpPagePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensesListPageRoutingModule {}
