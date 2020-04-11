import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ExpensesDetailPageRoutingModule } from "./expenses-detail-routing.module";

import { ExpensesDetailPage } from "./expenses-detail.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpensesDetailPageRoutingModule,
  ],
  declarations: [ExpensesDetailPage],
})
export class ExpensesDetailPageModule {}
