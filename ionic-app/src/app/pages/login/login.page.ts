import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: any;
  messageEmail = '';
  messagePassword = '';
  errorEmail = false;
  errorPassword = false;
  // email = '';
  // password = '';


  constructor(
    private authService: AuthenticationService,
    formBuilder: FormBuilder,
  ) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
      Validators.required])],
    });
  }

  ngOnInit() {

  }

  login() {


    const { email, password } = this.loginForm.controls;

    if (!this.loginForm.valid) {
      if (!email.valid) {
        this.errorEmail = true;
        this.messageEmail = 'Ops! Email inválido';
      } else {
        this.messageEmail = '';
      }

      if (!password.valid) {
        this.errorPassword = true;
        this.messagePassword ='A senha precisa ter de 6 a 20 caracteres';
      } else {
        this.messagePassword = '';
      }
    }
    else {
      this.authService.login(email.value, password.value);
    }

  }
  // loginUser(){

  // }

}
