import { credentials } from './../config/credentials';
import { Ingredient } from './ingredient.model';
import { RecipesService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipes.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

const DATABASE_RECIPES_PATH = '/recipes.json';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeServices: RecipesService
  ) {}

  storeRecipes(): void {
    const recipes = this.recipeServices.getRecipes();

    this.http
      .put(`${credentials.DATABASE_URL_API}${DATABASE_RECIPES_PATH}`, recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes(): Observable<any> {
    return this.http
      .get<Recipe[]>(`${credentials.DATABASE_URL_API}${DATABASE_RECIPES_PATH}`)
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeServices.setRecipes(recipes);
        })
      );
  }
}
