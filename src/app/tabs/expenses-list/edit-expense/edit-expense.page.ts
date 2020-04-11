import { Component, OnInit, OnDestroy } from "@angular/core";
import { Expense } from "../../expense.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NavController, ToastController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ExpensesService } from "../../expenses.service";

@Component({
  selector: "app-edit-expense",
  templateUrl: "./edit-expense.page.html",
  styleUrls: ["./edit-expense.page.scss"],
})
export class EditExpensePage implements OnInit, OnDestroy {
  expense: Expense;
  loadedExpenses: Expense[];
  form: FormGroup;
  private expenseSub: Subscription;
  currentExpenseDate: Date;
  showImage = true;
  imageTimeStamp: Date;
  formDate: Date;
  idFound = false;

  constructor(
    private route: ActivatedRoute,
    private expensesService: ExpensesService,
    private navCtrl: NavController,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.expenseSub = this.expensesService.expenses.subscribe((expenses) => {
        this.loadedExpenses = expenses;
        for (let expense of this.loadedExpenses) {
          if (expense.id === paramMap.get("id")) {
            this.expenseSub = this.expensesService
              .getExpense(paramMap.get("id"))
              .subscribe((expense) => {
                this.expense = expense;
                this.imageTimeStamp = new Date(this.expense.imageTimeStamp);
                this.currentExpenseDate = new Date(this.expense.expenseDate);
                this.form = new FormGroup({
                  title: new FormControl(this.expense.title, {
                    updateOn: "blur",
                    validators: [Validators.required],
                  }),
                  amount: new FormControl(this.expense.amount, {
                    updateOn: "blur",
                    validators: [Validators.required, Validators.min(0)],
                  }),
                  expenseDate: new FormControl(
                    this.currentExpenseDate.toISOString(),
                    {
                      updateOn: "blur",
                      validators: [Validators.required],
                    }
                  ),
                  expenseType: new FormControl(this.expense.expenseType, {
                    updateOn: "blur",
                    validators: [Validators.required],
                  }),
                  image: new FormControl(this.expense.image),
                  notes: new FormControl(this.expense.notes, {
                    updateOn: "blur",
                    validators: [Validators.maxLength(180)],
                  }),
                });
              });
            this.idFound = true;
            break;
          }
        }
        if (!this.idFound) {
          this.router.navigateByUrl("/tabs/expenses-list");
        }
      });
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Expense edited successfully.",
      duration: 1500,
      position: "bottom",
    });
    toast.present();
  }

  onCancel(id: string) {
    this.navCtrl.navigateBack(["/", "tabs", "expenses-list", id]);
    this.form.reset();
  }

  onImagePicked(imageData) {
    let imageFile;
    imageFile = imageData.imagePick;
    this.form.patchValue({ image: imageFile });
    this.showImage = false;
    this.imageTimeStamp = new Date(imageData.timeStamp);
  }

  onRemoveImage() {
    this.showImage = false;
    this.form.patchValue({ image: null });
  }

  onEditExpense(id: string) {
    if (!this.form.valid) {
      return;
    }
    this.formDate = new Date(this.form.value.expenseDate);
    this.expensesService
      .updateExpense(
        this.expense.id,
        this.form.value.title,
        +this.form.value.amount,
        new Date(this.formDate.setUTCHours(0, 0, 0, 0)),
        this.form.value.expenseType,
        this.form.value.image,
        new Date(this.imageTimeStamp),
        this.form.value.notes
      )
      .subscribe(() => {
        this.form.reset();
        this.presentToast();
        this.navCtrl.navigateBack(["/", "tabs", "expenses-list", id]);
      });
  }

  ngOnDestroy() {
    if (this.expenseSub) {
      this.expenseSub.unsubscribe();
    }
  }
}
