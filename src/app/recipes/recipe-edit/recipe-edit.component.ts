import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

import { RecipeService } from '../recipe.service';
import { Recipe } from '../../recipe';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: []
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;
  private recipeIndex:number;
  private recipe:Recipe;
  private isNew = true;
  private subscription:Subscription;

  constructor(private route:ActivatedRoute, 
  			  private recipeService:RecipeService,
  			  private formBuilder:FormBuilder,
  			  private router:Router) { }

  ngOnInit() {
  	//Get the id from the url
  	this.subscription = this.route.params.subscribe((params:any)=>{
	  		if (params.hasOwnProperty('id')) {
	  			this.isNew = false; //Meaning im editing so recipe not new
	  			this.recipeIndex = +params['id'] //the + convert it into a number
	  			this.recipe = this.recipeService.getRecipe(this.recipeIndex);
	  		} else{
	  			this.isNew = true;	
	  			this.recipe = null;	
	  		}
	  		this.initFrom();
	  	}
  	);
  }
  onSubmit(){
  	const newRecipe = this.recipeForm.value;
  	if(this.isNew){
  		this.recipeService.addRecipe(newRecipe);
  	} else{
  		this.recipeService.editRecipe(this.recipe, newRecipe);  		
  	}
  	this.navigateBack();
  }
  onCancel(){
  	this.navigateBack();  	
  }
  onAddItem(name:string, amount:string){
  	//Casting to array:
  	(<FormArray>this.recipeForm.controls['ingredients']).push(
  		new FormGroup({
			name: new FormControl(name, Validators.required),
			amount: new FormControl(amount, [
				Validators.required,
				Validators.pattern("\\d+") //should be a digit
			])
  		})
  	)
  }
  onRemoveItem(index:number){
  	//Casting to array:
  	(<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);//removeAt() allow us to specify the indes in which we want to recove the data
  }
  private navigateBack(){ this.router.navigate(['../']); }
  ngOnDestroy(){ this.subscription.unsubscribe(); }
  private initFrom(){
  	//Variables
  	let recipeName = '';
  	let recipeImageUrl = '';
  	let recipeContent = '';
  	let recipeIngredients:FormArray = new FormArray([]);
  	//if on edit mode
  	if (!this.isNew) {
      //Check if the recipe has ingredients to avoid the bug
      if (this.recipe.hasOwnProperty('ingredients')) {        
        for (let i = 0; i < this.recipe.ingredients.length; i++) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
              amount: new FormControl(this.recipe.ingredients[i].amount, [
                Validators.required,
                Validators.pattern("\\d+") //should be a digit
              ])
            })
          );        
        }
      }      
      recipeName = this.recipe.name;
      recipeImageUrl = this.recipe.imagePath;
      recipeContent = this.recipe.description;
  	}
  	//Create the form on both mode: edit and new
	this.recipeForm = this.formBuilder.group({
		name: [recipeName, Validators.required], 
		imagePath: [recipeImageUrl, Validators.required], 
		description: [recipeContent, Validators.required], 
		ingredients:recipeIngredients
	});
  }
}
