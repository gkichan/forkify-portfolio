import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchResult;

  constructor(
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

  }

  onGetRecipes(res) {
    if (!res.length) this.translate.get('home.searchError').subscribe(errMsg => this.toastr.error(errMsg));
    this.searchResult = res;
  }

  onSpinner(isActive) {
    if (isActive) this.spinner.show();
    else this.spinner.hide();
  }
}
