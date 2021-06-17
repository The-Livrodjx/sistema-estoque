import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddQuantityProductPageRoutingModule } from './add-quantity-product-routing.module';

import { AddQuantityProductPage } from './add-quantity-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddQuantityProductPageRoutingModule
  ],
  declarations: [AddQuantityProductPage]
})
export class AddQuantityProductPageModule {}
