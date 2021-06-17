import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {DashboardPage} from '../dashboard/dashboard.page';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface productData {
  productName: any;
  productAmount: any;
  productPrice: any;
}

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})

export class NewProductPage implements OnInit {
  public productForm: any;

  constructor(
    formBuilder: FormBuilder,
    private dashboardPage: DashboardPage,
    private router: Router
  ) {

    this.productForm = formBuilder.group({
      productName: ['', Validators.required],
      productAmount: ['', Validators.required],
      productPrice: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  cadastrarProduto() {
    const { productName, productAmount, productPrice } = this.productForm.controls;


    // console.log(productName.value + ' ' + productAmount.value + ' ' + productPrice.value);
    if(productName !== undefined && productAmount !==  undefined && productPrice !==  undefined) {

      const data = {
        name: productName.value,
        quantidade: productAmount.value,
        preco: productPrice.value
      };
      // eslint-disable-next-line @typescript-eslint/ban-types
      axios.request<productData, object>({
        method: 'post',
        url: 'http://localhost:3000/createProduct',
        data
      // eslint-disable-next-line @typescript-eslint/ban-types
      }).then(() => {
        alert('Produto cadastrado com sucesso, recarregue a página por favor');
        this.dashboardPage.getAllProducts();
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
