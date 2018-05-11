//import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[] = [] //third stage: working with services
  /*
  	//Second stage data: 
  	//The last argument [] is for ingredients:
  	new Recipe('The Title', "The Dummy description", "assets/a.jpg", []),
  	new Recipe('Dummy Title', "Dummy description of the Second fake data", "assets/b.jpg", [])
  ]; 
  */
  //@Output() recipeSelected = new EventEmitter<Recipe>(); //For onSelected
  //recipe = new Recipe("Dummy", "Dummy", "assets/logo.jpg")//first stage data

  constructor(private recipeService:RecipeService) { }
  //Before service:
  //constructor() { }

  ngOnInit() {
  	this.recipes = this.recipeService.getRecipes();
    //Get informe when changes happen:
    this.recipeService.recipesChanged.subscribe(
      (recipes:Recipe[]) => this.recipes = recipes //update recipes
    );
  }
  /* Before setting route
  onSelected(recipe:Recipe){
  	this.recipeSelected.emit(recipe);
  } */

}
