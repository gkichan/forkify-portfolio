import { Component, OnInit } from '@angular/core';
import { FavoritesDbService } from "../../services/favorites-db.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites;
  showRecipe = [];
  recipePerPage = 12;
  currentPage = 1;
  pages = 0;

  constructor(
    private favoritesService: FavoritesDbService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.favoritesService.getFavorites().subscribe(res => {
      this.spinner.hide();
      this.favorites = res;
      this.pages = Math.ceil(this.favorites.length / this.recipePerPage);
      this.showPage();
    });
  }

  showPage(page: number = 1) {
    this.currentPage = page;
    const start = (page - 1) * this.recipePerPage;
    const end = page * this.recipePerPage;
    this.showRecipe = this.favorites.slice(start, end);
  }

  onDelete(item) {
    this.spinner.show();
    this.favoritesService.deleteRecipe(item)
      .then(() => {
        this.spinner.hide();
        this.translate.get('favorites.successDelete').subscribe(res=> {
          this.toastr.success(res);
        });
      })
      .catch(err => {
        this.spinner.hide();
        this.toastr.error(err);
      })
  }
}
