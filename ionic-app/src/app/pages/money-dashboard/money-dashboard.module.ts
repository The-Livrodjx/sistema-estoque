import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoneyDashboardPageRoutingModule } from './money-dashboard-routing.module';

import { MoneyDashboardPage } from './money-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoneyDashboardPageRoutingModule
  ],
  declarations: [MoneyDashboardPage]
})
export class MoneyDashboardPageModule {}
