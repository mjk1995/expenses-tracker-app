import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { take, map, tap } from "rxjs/operators";
import { Expense } from "./expense.model";

@Injectable({
  providedIn: "root",
})
export class ExpensesService {
  public dateFrom: Date = new Date("2000-01-01");
  public dateTo: Date = new Date("2020-12-31");
  public expenseType = "All";
  private _expenses = new BehaviorSubject<Expense[]>(JSON.parse(localStorage.getItem('expenses'))
  );

  get expenses() {
    return this._expenses.asObservable();
  }

  constructor() {}

  filterExpense(dateFrom: Date, dateTo: Date, expenseType: string) {
    this.dateFrom = new Date(dateFrom);
    this.dateTo = new Date(dateTo);
    this.expenseType = expenseType;
    return this.dateFrom, this.dateTo, this.expenseType;
  }

  getExpense(id: string) {
    return this.expenses.pipe(
      take(1),
      map((expenses) => {
        return { ...expenses.find((e) => e.id === id) };
      })
    );
  }

  addExpense(
    id: string,
    title: string,
    amount: number,
    expenseDate: Date,
    expenseType: string,
    image: string | File,
    imageTimeStamp: Date,
    notes: string
  ) {
    const newExpense = new Expense(
      id,
      title,
      amount,
      new Date(expenseDate),
      expenseType,
      image,
      new Date(imageTimeStamp),
      notes
    );
    return this.expenses.pipe(take(1)).subscribe((expenses) => {
      this._expenses.next(expenses.concat(newExpense));
      localStorage.setItem('expenses',JSON.stringify(expenses.concat(newExpense)));
    });
  }

  updateExpense(
    id: string,
    title: string,
    amount: number,
    expenseDate: Date,
    expenseType: string,
    image: string | File,
    imageTimeStamp: Date,
    notes: string
  ) {
    return this.expenses.pipe(
      take(1),
      tap((expenses) => {
        const updatedExpenseIndex = expenses.findIndex((e) => e.id === id);
        const updatedExpenses = [...expenses];
        const oldExpense = updatedExpenses[updatedExpenseIndex];
        updatedExpenses[updatedExpenseIndex] = new Expense(
          oldExpense.id,
          title,
          amount,
          new Date(expenseDate),
          expenseType,
          image,
          new Date(imageTimeStamp),
          notes
        );
        this._expenses.next(updatedExpenses);
        localStorage.setItem('expenses',JSON.stringify(updatedExpenses));
      })
    );
  }
  deleteExpense(expenseId: string) {
    return this.expenses.pipe(
      take(1),
      tap((expenses) => {
        this._expenses.next(expenses.filter((e) => e.id !== expenseId));
        localStorage.setItem('expenses',JSON.stringify(expenses.filter((e) => e.id !== expenseId)));
      })
    );
  }
}
