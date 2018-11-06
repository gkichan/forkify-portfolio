import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from "angularfire2/firestore";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../models/RecipeDetails";
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class FavoritesDbService {
  private favoriteRecipes: AngularFirestoreCollection;
  private collectionName: string = 'favorite_recipes';


  constructor(
    private http: HttpClient,
    private afs: AngularFirestore
  ) {
    this.favoriteRecipes = this.afs.collection(this.collectionName);
  }

  addRecipe(recipe: Recipe) {
    return this.favoriteRecipes.add(recipe)
      .then(res => {
        console.log(res);
      });
  }

  deleteRecipe(recipe: Recipe) {
    return this.afs.collection(this.collectionName).doc(recipe.id).delete();
  }

  getFavorites() {
    return this.favoriteRecipes.snapshotChanges().pipe(
      map(actions => actions.map(item => {
        const data = item.payload.doc.data();
        const id = item.payload.doc.id;

        return { id, ...data };
      }))
    )
  }
}
