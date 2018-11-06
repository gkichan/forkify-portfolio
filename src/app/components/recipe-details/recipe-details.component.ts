import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RecipeService } from "../../services/recipe.service";
import { Observable } from "rxjs";
import { Recipe, RecipeDetails } from "../../models/RecipeDetails";
import { FavoritesDbService } from "../../services/favorites-db.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  id: string;
  recipe;
  ingredientsList: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private favoritesService: FavoritesDbService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.id = this.route.snapshot.params['id'];

     this.recipeService.getRecipe(this.id).subscribe(({recipe:r}:RecipeDetails) => {
      this.spinner.hide();
      this.recipe = r;
      this.ingredientsList = new Observable(observer => {
        observer.next(r.ingredients);
      });
    });
   }

  onFavorite(recipe: Recipe) {
    this.spinner.show();
    this.favoritesService.addRecipe(recipe)
      .then(() => {
        this.spinner.hide();
        this.translate.get('search-result.successAdd').subscribe( successMsg => this.toastr.success(successMsg))
      })
      .catch( err => {
        this.spinner.hide();
        this.toastr.error(err)
      });
  }
}
