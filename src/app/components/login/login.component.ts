import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    'email': new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    'password': new FormControl('', [
    Validators.required,
    Validators.minLength(6)
    ])
  });


  constructor(
    private auth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  onLogin() {
    if (this.loginForm.invalid) return;
    this.spinner.show();

    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    this.auth.login(email, password)
      .then(() => {
        this.spinner.hide();
        this.router.navigate(['/']);
      })
        .catch(err => {
          this.spinner.hide();
          console.log(err);
      });
  }
}
