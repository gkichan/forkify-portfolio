import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../../services/recipe.service";
import {Observable} from "rxjs";

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
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.recipeService.getRecipe(this.id).subscribe(({recipe: r}) => {
      this.recipe = r;
      this.ingredientsList = new Observable(observer => {
        observer.next(r.ingredients);
      });
    });
  }

}
