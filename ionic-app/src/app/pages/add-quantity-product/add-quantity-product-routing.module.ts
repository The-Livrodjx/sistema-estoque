import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddQuantityProductPage } from './add-quantity-product.page';

const routes: Routes = [
  {
    path: '',
    component: AddQuantityProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddQuantityProductPageRoutingModule {}
