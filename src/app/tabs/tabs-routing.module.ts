import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "expenses-list",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./expenses-list/expenses-list.module").then(
                (m) => m.ExpensesListPageModule
              ),
          },
          {
            path: "filter-expenses",
            loadChildren: () =>
              import(
                "./expenses-list/filter-expenses/filter-expenses.module"
              ).then((m) => m.FilterExpensesPageModule),
          },
          {
            path: "help-page",
            loadChildren: () =>
              import("./expenses-list/help-page/help-page.module").then(
                (m) => m.HelpPagePageModule
              ),
          },
          {
            path: ":id",
            loadChildren: () =>
              import(
                "./expenses-list/expenses-detail/expenses-detail.module"
              ).then((m) => m.ExpensesDetailPageModule),
          },
          {
            path: "edit/:id",
            loadChildren: () =>
              import("./expenses-list/edit-expense/edit-expense.module").then(
                (m) => m.EditExpensePageModule
              ),
          },
        ],
      },
      {
        path: "expense-add",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./expense-add/expense-add.module").then(
                (m) => m.ExpenseAddPageModule
              ),
          },
          {
            path: "new-expense",
            loadChildren: () =>
              import("./expense-add/new-expense/new-expense.module").then(
                (m) => m.NewExpensePageModule
              ),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/expenses-list",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "tabs",
    redirectTo: "/tabs/expenses-list",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
