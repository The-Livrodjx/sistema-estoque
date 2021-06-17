import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoneyDashboardPage } from './money-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: MoneyDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoneyDashboardPageRoutingModule {}
