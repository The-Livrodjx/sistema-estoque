/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras  } from '@angular/router';
import axios, {AxiosResponse, AxiosError} from 'axios';


interface searchData {
  query: string;
}

interface sellData {
  id: any;
  amount: any;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public deleteForm: any;
  public productSearch: any;
  public sellForm: any;
  products: any[];
  ganhosTotais: any;
  token: AxiosResponse<any>;

  constructor(
    private authService: AuthenticationService,
    public storage: Storage,
    private router: Router,
    formBuilder: FormBuilder
    ) {
      this.deleteForm = formBuilder.group({
        id: ['', Validators.required],
      });

      this.productSearch = formBuilder.group({
        productSearchName: ['', Validators.required],
      });

      this.sellForm = formBuilder.group({
        amountToSell: ['', Validators.required],
      });

      this.products = [];
    }

  async ngOnInit() {
    await this.storage.get('USER_INFO').then((response: AxiosResponse) => {
      this.token = response;
      this.getAllProducts();
    });
  }

  logoutUser(){
    this.authService.logout();
  }

  deleteProduct(id: any) {

    const req = {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: 'Bearer ' + `${this.token}`
      }
    };
    const confirmation = confirm('Tem certeza que deseja excluir esse produto ?');

    if(confirmation) {

      axios.delete('http://localhost:3000/deleteProduct/' + id, req).then(() => {
        alert('Produto deletado com sucesso');

        this.getAllProducts();
      });
    }
  }

  // returnToken() {
  //   this.storage.get('USER_INFO').then((response) => response);

  //   this.getAllUsers();
  // }
  getAllProducts() {
    // eslint-disable-next-line prefer-const

    const req = {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${this.token}`
      }
    };

    axios.get('http://localhost:3000/getProducts', req).then((response: AxiosResponse) => {

      this.products = response.data.produtos;
      this.ganhosTotais = response.data.ganhosTotais;

    }).catch((err: AxiosError) => {

      console.log(err);
    });
  }

  searchProduct() {
    const { productSearchName } = this.productSearch.controls;
    const query = productSearchName.value;

    if(query !== undefined) {
      axios.request<searchData, any>({
        method: 'post',
        url: 'http://localhost:3000/searchProduct',
        data: {
          name: query
        }
      }).then((response: AxiosResponse) => {

        this.products = response.data;
      });
    }
  }

  sellProduct(id: any, amount: any) {

    const {amountToSell} = this.sellForm.controls;

    if(amountToSell.value > amount) {

      alert('Produto insuficiente em estoque');
    }

    else {
      axios.request<sellData, any>({
        method: 'post',
        url: 'http://localhost:3000/sellAnotherItem',
        data: {
          id,
          totalSelled: amountToSell.value
        }
      }).then(() => {
        alert('Vendido com sucesso');
        amountToSell.value = '';
        this.getAllProducts();

      }).catch(err => [
        console.log(err)
      ]);
    }
  }

  addQuantity(id: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        id
      }
    };
    this.router.navigate(['add-quantity-product'], navigationExtras);
  }

  newMonth() {

    const confirmation = confirm('Tem certeza que você deseja finalizar as contas desse mês ?');

    if(confirmation) {
      axios.request<any>({
        method: 'post',
        url: 'http://localhost:3000/newMonth'
      }).then(() => {
        this.refreshPage();
      });
    }
  }

  refreshPage() {

    this.ngOnInit();
  }

}
