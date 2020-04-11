import { Component, OnInit, OnDestroy } from "@angular/core";
import { Expense } from "../../expense.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ExpensesService } from "../../expenses.service";
import { NavController, ToastController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-expense",
  templateUrl: "./new-expense.page.html",
  styleUrls: ["./new-expense.page.scss"],
})
export class NewExpensePage implements OnInit, OnDestroy {
  expense: Expense;
  form: FormGroup;
  private expenseSub: Subscription;
  imageTimeStamp: Date;
  formDate: Date;

  constructor(
    private expensesService: ExpensesService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      amount: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.min(0)],
      }),
      expenseDate: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      expenseType: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      image: new FormControl(null),
      notes: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.maxLength(180)],
      }),
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Expense added.",
      duration: 1500,
      position: "top",
    });
    toast.present();
  }

  onImagePicked(imageData) {
    let imageFile;
    imageFile = imageData.imagePick;
    this.form.patchValue({ image: imageFile });
    this.imageTimeStamp = new Date(imageData.timeStamp);
  }

  onRemoveImage() {
    this.form.patchValue({ image: null });
  }

  onCancel() {
    this.navCtrl.navigateBack(["/", "tabs", "expense-add"]);
    this.form.reset();
  }

  onAddExpense() {
    if (!this.form.valid) {
      return;
    }
    this.formDate = new Date(this.form.value.expenseDate);
    const date = Date.now().toString();
    this.expensesService.addExpense(
      date,
      this.form.value.title,
      +this.form.value.amount,
      new Date(this.formDate.setUTCHours(0, 0, 0, 0)),
      this.form.value.expenseType,
      this.form.value.image,
      new Date(this.imageTimeStamp),
      this.form.value.notes
    );
    if (
      new Date(this.form.value.expenseDate) >
      new Date(this.expensesService.dateTo)
    ) {
      this.expensesService.filterExpense(
        new Date(this.expensesService.dateFrom),
        new Date(this.form.value.expenseDate),
        "All"
      );
    } else if (
      new Date(this.form.value.expenseDate) <
      new Date(this.expensesService.dateFrom)
    ) {
      this.expensesService.filterExpense(
        new Date(this.form.value.expenseDate),
        new Date(this.expensesService.dateTo),
        "All"
      );
    } else {
      this.expensesService.filterExpense(
        new Date(this.expensesService.dateFrom),
        new Date(this.expensesService.dateTo),
        "All"
      );
    }

    this.presentToast();
    this.onCancel();
  }

  ngOnDestroy() {
    if (this.expenseSub) {
      this.expenseSub.unsubscribe();
    }
  }
}
