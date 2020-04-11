import { Component, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs";
import { ExpensesService } from "../expenses.service";
import { Expense } from "../expense.model";

@Component({
  selector: "app-expenses-list",
  templateUrl: "./expenses-list.page.html",
  styleUrls: ["./expenses-list.page.scss"],
})
export class ExpensesListPage implements OnInit, OnDestroy {
  loadedExpenses: Expense[];
  listedLoadedExpenses: Expense[];
  relevantExpenses: Expense[];
  sortedExpenses: Expense[];
  private expensesSub: Subscription;
  dateFrom: Date;
  dateTo: Date;
  expenseType: string;
  totalPrice: number;
  filtered: boolean = false;

  constructor(private expensesService: ExpensesService) {}

  ngOnInit() {
    this.expensesSub = this.expensesService.expenses.subscribe((expenses) => {
      this.loadedExpenses = expenses;
      if (this.loadedExpenses.length === 0) {
        this.dateFrom = new Date("2000-01-01 00:00:00 GMT");
        this.dateTo = new Date("2020-12-12 00:00:00 GMT");
      } else if (!this.filtered) {
        this.sortedExpenses = this.loadedExpenses.sort(
          (a, b) => new Date(a.expenseDate).getTime() - new Date(b.expenseDate).getTime()
        );
        this.dateFrom = new Date(this.sortedExpenses[0].expenseDate);
        this.dateTo = new Date(
          this.sortedExpenses[this.sortedExpenses.length - 1].expenseDate
        );
      }
      this.expensesService.filterExpense(this.dateFrom, this.dateTo, "All");
      this.onFilterUpdate(
        this.expensesService.dateFrom,
        this.expensesService.dateTo,
        this.expensesService.expenseType
      );
    });
  }

  ionViewWillEnter() {
    this.onFilterUpdate(
      this.expensesService.dateFrom,
      this.expensesService.dateTo,
      this.expensesService.expenseType
    );
  }

  onClearFilter() {
    this.expensesSub = this.expensesService.expenses.subscribe((expenses) => {
      this.loadedExpenses = expenses;
      if (this.loadedExpenses.length === 0) {
        this.dateFrom = new Date("2000-01-01 00:00:00 GMT");
        this.dateTo = new Date("2020-12-12 00:00:00 GMT");
      } else {
        this.sortedExpenses = this.loadedExpenses.sort(
          (a, b) => new Date(a.expenseDate).getTime() - new Date(b.expenseDate).getTime()
        );
        this.dateFrom = new Date(this.sortedExpenses[0].expenseDate);
        this.dateTo = new Date(
          this.sortedExpenses[this.sortedExpenses.length - 1].expenseDate
        );
      }
      this.expensesService.filterExpense(this.dateFrom, this.dateTo, "All");
      this.onFilterUpdate(
        this.expensesService.dateFrom,
        this.expensesService.dateTo,
        this.expensesService.expenseType
      );
    });
    this.filtered = false;
  }

  onFilterUpdate(dateFrom: Date, dateTo: Date, expenseType: string) {
    this.dateFrom = new Date(dateFrom.setUTCHours(0, 0, 0, 0));
    this.dateTo = new Date(dateTo.setUTCHours(0, 0, 0, 0));
    this.expenseType = expenseType;
    const isShown = (expense) =>
      new Date(expense.expenseDate).valueOf() >= this.dateFrom.valueOf() &&
      new Date(expense.expenseDate).valueOf() <= this.dateTo.valueOf() &&
      (expense.expenseType === this.expenseType || this.expenseType === "All");
    this.relevantExpenses = this.loadedExpenses.filter(isShown);
    this.listedLoadedExpenses = this.relevantExpenses.sort(
      (a, b) => new Date(a.expenseDate).getTime() - new Date(b.expenseDate).getTime()
    );
    this.totalPrice = this.listedLoadedExpenses.reduce(
      (a, b) => a + b.amount,
      0
    );
    if (
      (JSON.stringify(this.loadedExpenses) !==
        JSON.stringify(this.relevantExpenses) ||
      this.expenseType !== "All") &&
      this.loadedExpenses.length !== 0
    ) {
      this.filtered = true;
    } else {
      this.filtered = false;
    }
  }

  ngOnDestroy() {
    if (this.expensesSub) {
      this.expensesSub.unsubscribe();
    }
  }
}
