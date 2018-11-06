import { Component, Input, OnChanges } from '@angular/core';
import { FavoritesDbService } from "../../services/favorites-db.service";
import { Recipe } from "../../models/RecipeDetails";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnChanges {
  @Input('result') searchResult;
  showRecipe = [];
  recipePerPage = 12;
  currentPage = 1;
  pages = 0;

  constructor(
    private favoritesService: FavoritesDbService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnChanges() {
    this.pages = Math.ceil(this.searchResult.length / this.recipePerPage);
    this.showPage();
  }

  showPage(page: number = 1) {
    this.currentPage = page;
    const start = (page - 1) * this.recipePerPage;
    const end = page * this.recipePerPage;
    this.showRecipe = this.searchResult.slice(start, end);
  }

  onFavorite(recipe: Recipe) {
    this.favoritesService.addRecipe(recipe)
      .then(()=> {
        this.translate.get('search-result.successAdd').subscribe(successMsg =>  this.toastr.success(successMsg));
      })
      .catch(err => {
        this.toastr.error(err);
      });
  }

}
