import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx'; //Allow me to use the map method without problem

import { Recipe } from './../recipe';
import { Ingredient } from "../shared/ingredient";


@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();
  private recipes:Recipe[] = [
  	new Recipe('Recipe from service', "The Dummy description", "assets/c.png", [
  		new Ingredient('French Fried', 2),
  		new Ingredient('Italian Spaguetti', 1)
  	]),
  	new Recipe('Recipe 2 from service', "Dummy description of the Second fake data", "assets/d.png", [])
  ]
  constructor(private http:Http) { }

  getRecipes(){
  	return this.recipes;
  }
  getRecipe(id:number){
    return this.recipes[id];
  }
  deleteRecipe(recipe:Recipe){
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }
  addRecipe(recipe:Recipe){
    return this.recipes.push(recipe);
  }
  editRecipe(oldRecipe: Recipe, newRecipe:Recipe){
    return this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }
  storeData(){
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type':'application/json'
    });
    //This is an observable 
    //The post tell firebase to overwrite to old data and create a token
    //return this.http.post("https://recipebooking.firebaseio.com/recipes.json", body, {headers:headers})
    return this.http.put("https://recipebooking.firebaseio.com/recipes.json", body, {headers:headers})
  }
  fetchData(){
    //Get the data as an objet:
    return this.http.get("https://recipebooking.firebaseio.com/recipes.json").map((response:Response) => response.json()).subscribe(
        (data:Recipe[]) => {
          this.recipes = data;
          this.recipesChanged.emit(this.recipes); //For the recipe-list
        }
      );
  }
}
