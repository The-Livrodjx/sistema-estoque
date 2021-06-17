import { Component, OnInit } from '@angular/core';
import axios, {AxiosResponse, AxiosError} from 'axios';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-money-dashboard',
  templateUrl: './money-dashboard.page.html',
  styleUrls: ['./money-dashboard.page.scss'],
})
export class MoneyDashboardPage implements OnInit {
  managements: any;
  token: AxiosResponse<any>;
  constructor(
    private storage: Storage
  ) { }

  async ngOnInit() {
    await this.storage.get('USER_INFO').then((response: AxiosResponse) => {
      this.token = response;
      this.getAllProducts();
    });
  }

  getAllProducts() {
    // eslint-disable-next-line prefer-const

    const req = {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${this.token}`
      }
    };

    axios.get('http://localhost:3000/getManagements', req).then((response: AxiosResponse) => {

      this.managements = response.data;
    }).catch((err: AxiosError) => {

      console.log(err);
    });
  }

}
