/* eslint-disable @angular-eslint/contextual-lifecycle */
/* eslint-disable @typescript-eslint/naming-convention */
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import axios, {AxiosResponse, AxiosRequestConfig, AxiosError} from 'axios';

interface loginData {
  email: any;
  password: any;
}
interface AxiosInstance {
  request<T = any, R = AxiosResponse<T>> (config: AxiosRequestConfig): Promise<R>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);
  token = '';
  constructor(
    private router: Router,
    public storage: Storage,
    private platform: Platform,
    public toastController: ToastController
  ) {

    this.platform.ready().then(async () => {
      await this.storage.create();

      this.ifLoggedIn();
    });
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  // async ngOnInit() {
  //   // If using a custom driver:
  //   // await this.storage.defineDriver(MyCustomDriver)

  // }

  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  login(email: loginData, password: loginData) {

    // eslint-disable-next-line @typescript-eslint/ban-types
    axios.request<loginData, object>({
      method: 'post',
      url: 'http://localhost:3000/authenticate',
      data: {
        email,
        password
      }
    // eslint-disable-next-line @typescript-eslint/ban-types
    }).then((response: AxiosResponse) => {

      this.storage.set('USER_INFO', response.data.token).then(() => {
        // alert(email + ', ' + password);
        this.router.navigate(['dashboard']);
        this.authState.next(true);
      });
    }).catch((err: AxiosError) => {

      alert(err.response.data.message);
    });
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

}
