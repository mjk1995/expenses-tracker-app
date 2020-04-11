import { Component, OnInit, OnDestroy } from "@angular/core";
import { Expense } from "../../expense.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ExpensesService } from "../../expenses.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-filter-expenses",
  templateUrl: "./filter-expenses.page.html",
  styleUrls: ["./filter-expenses.page.scss"],
})
export class FilterExpensesPage implements OnInit, OnDestroy {
  expense: Expense;
  form: FormGroup;
  private expenseSub: Subscription;
  copiedExpenses: Expense[];
  sortedExpenses: Expense[];
  startDate: Date;
  endDate: Date;
  formDateFrom: Date;
  formDateTo: Date;

  constructor(
    private expensesService: ExpensesService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.expenseSub = this.expensesService.expenses.subscribe((expenses) => {
      this.copiedExpenses = expenses;
      if (this.copiedExpenses.length === 0) {
        this.startDate = new Date("2000-01-01 00:00:00 GMT");
        this.endDate = new Date("2020-12-12 00:00:00 GMT");
      } else {
        this.sortedExpenses = this.copiedExpenses.sort(
          (a, b) => new Date(a.expenseDate).getTime() - new Date(b.expenseDate).getTime()
        );
        this.startDate = new Date(this.sortedExpenses[0].expenseDate);
        this.endDate = new Date(
          this.sortedExpenses[this.sortedExpenses.length - 1].expenseDate
        );
      }
      this.form = new FormGroup({
        dateFrom: new FormControl(this.startDate.toISOString(), {
          updateOn: "blur",
          validators: [Validators.required],
        }),
        dateTo: new FormControl(this.endDate.toISOString(), {
          updateOn: "blur",
          validators: [Validators.required],
        }),
        expenseType: new FormControl("All", {
          updateOn: "blur",
          validators: [Validators.required],
        }),
      });
    });
  }

  onFilter() {
    if (!this.form.valid) {
      return;
    }
    this.formDateFrom = new Date(this.form.value.dateFrom);
    (this.formDateTo = new Date(this.form.value.dateTo)),
      this.expensesService.filterExpense(
        new Date(this.formDateFrom.setUTCHours(0, 0, 0, 0)),
        new Date(this.formDateTo.setUTCHours(0, 0, 0, 0)),
        this.form.value.expenseType
      );
    this.navCtrl.navigateBack("/tabs/expenses-list");
  }

  onCancel() {
    this.navCtrl.navigateBack(["/", "tabs", "expenses-list"]);
  }

  ngOnDestroy() {
    if (this.expenseSub) {
      this.expenseSub.unsubscribe();
    }
  }
}
