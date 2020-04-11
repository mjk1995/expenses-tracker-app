import { Component, OnInit, OnDestroy } from "@angular/core";
import { Expense } from "../../expense.model";
import { Subscription } from "rxjs";
import {
  NavController,
  AlertController,
  ToastController,
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { ExpensesService } from "../../expenses.service";

@Component({
  selector: "app-expenses-detail",
  templateUrl: "./expenses-detail.page.html",
  styleUrls: ["./expenses-detail.page.scss"],
})
export class ExpensesDetailPage implements OnInit, OnDestroy {
  expense: Expense;
  loadedExpenses: Expense[];
  private expenseSub: Subscription;
  idFound = false;
  timeStamp: Date;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private expensesService: ExpensesService,
    public alertController: AlertController,
    public router: Router,
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
                this.timeStamp = new Date(expense.imageTimeStamp);
              });
            this.idFound = true;
            break;
          }
        }
        if (!this.idFound) this.router.navigateByUrl("/tabs/expenses-list");
      });
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Expense deleted.",
      duration: 1500,
      position: "top",
    });
    toast.present();
  }

  async presentAlertConfirm(id: string) {
    const alert = await this.alertController.create({
      header: "Confirm Delete",
      message: "Are you sure you want to delete?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
        },
        {
          text: "Delete",
          handler: () => {
            this.expensesService.deleteExpense(id).subscribe();
            this.presentToast();
            this.router.navigateByUrl("/tabs/expenses-list");
          },
        },
      ],
    });

    await alert.present();
  }

  onEditExpense(id: string) {
    this.router.navigate(["/", "tabs", "expenses-list", "edit", id]);
  }

  ngOnDestroy() {
    if (this.expenseSub) {
      this.expenseSub.unsubscribe();
    }
  }
}
