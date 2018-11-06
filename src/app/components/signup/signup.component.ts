import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormControl, Validators, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // Form
  signUpForm = new FormGroup({
    'emailFormControl': new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    'passwordFormControl': new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    'passwordRepeatFormControl': new FormControl('', [
      Validators.required
    ]),
  }, { validators: identPasValid });

  constructor(
    private auth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

  onSignUp() {
    if(this.signUpForm.invalid) return;
    this.spinner.show();

    const email = this.signUpForm.controls['emailFormControl'].value;
    const password = this.signUpForm.controls['passwordFormControl'].value;

    this.auth.signup(email, password)
      .then(() => {
        this.spinner.hide();
        this.router.navigate(['/'])
      })
      .catch(err => {
        console.log(err);
        this.spinner.hide();
      })
  }
}

// Custom validators
export const identPasValid:ValidatorFn = (control:FormGroup): ValidationErrors | null => {
  const pas1 = control.get('passwordFormControl');
  const pas2 = control.get('passwordRepeatFormControl');

  if (pas1 && pas2 && pas1.value !== pas2.value) {
    control.controls['passwordRepeatFormControl'].setErrors({'identityError': true });
    return {};
  } else {
    return null;
  }
};
