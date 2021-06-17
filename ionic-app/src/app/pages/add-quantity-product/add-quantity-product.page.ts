import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {DashboardPage} from '../dashboard/dashboard.page';
import axios, { AxiosResponse } from 'axios';

interface ProductData {
  id: any;
  productName: any;
  productAmount: any;
  productPrice: any;
}

@Component({
  selector: 'app-add-quantity-product',
  templateUrl: './add-quantity-product.page.html',
  styleUrls: ['./add-quantity-product.page.scss'],
})
export class AddQuantityProductPage implements OnInit {

  id: any;
  public addQuantityForm: any;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  productName: string = '';
  productAmount: any;
  productPrice: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardPage: DashboardPage,
    public formBuilder: FormBuilder,

    ) {

    this.addQuantityForm = formBuilder.group({
      productName: ['', Validators.required],
      productAmount: ['', Validators.required],
      productPrice: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.id = this.router.getCurrentNavigation().extras.state.id;
        console.log(this.id);
      }
    });
  }

  async ngOnInit() {

    this.insertData();
    // this.productName = 'FDSKFDLPMDSA';
  }

  insertData() {

    axios.get('http://localhost:3000/getProduct/' + this.id).then((response: AxiosResponse) => {


      this.productName = response.data.name;
      this.productAmount = response.data.quantidade;
      // eslint-disable-next-line prefer-const
      let convertedPrice = response.data.preco.split(' ')[1] * 1;
      this.productPrice = convertedPrice;

    });
  }
  editarProduto() {
    const {productName, productAmount, productPrice} = this.addQuantityForm.controls;

    if(productName.value !== undefined &&
      productAmount.value !== undefined &&
      productPrice.value !== undefined
    ) {

      const data = {
        id: this.id,
        name: productName.value,
        quantidade: productAmount.value,
        preco: `R$ ${productPrice.value.toFixed(2)}`,
      };

      axios.request<ProductData, any>({
        method: 'put',
        url: 'http://localhost:3000/updateProduct',
        data
      }).then(() => {

        alert('Produto atualizado com sucesso');
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
