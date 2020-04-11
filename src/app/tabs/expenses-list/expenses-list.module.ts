import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ExpensesListPage } from "./expenses-list.page";
import { ExpensesListPageRoutingModule } from "./expenses-list-routing.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExpensesListPageRoutingModule,
  ],
  declarations: [ExpensesListPage],
})
export class ExpensesListPageModule {}
