import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetEmailInput = new FormControl('', [
    Validators.email
  ]);

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onReset() {
    this.auth.resetPassword(this.resetEmailInput.value)
      .then((res) => {
        this.router.navigate(['/login'])
      })
      .catch(err => {
        console.log(err)
      })
  }
}
