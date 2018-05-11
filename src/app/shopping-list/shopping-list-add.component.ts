import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styleUrls: ['./shopping-list-add.component.css']
})
export class ShoppingListAddComponent implements OnChanges {
  @Input() item:Ingredient; 
  @Output() cleared = new EventEmitter();
  isAdd = true; //allows us to know if the user is editing
  constructor(private sls:ShoppingListService) { }
  //Called everytime a user select an item in the list
  ngOnChanges(changes) {
  	if (changes.item.currentValue === null) {
  		this.isAdd = true;
  		//setting the field to null to avoid the defaut behavior which set the whole objet to null and brake the app:
  		this.item = {name:null, amount:null};
  	} else{
  		this.isAdd = false;
  	}

  }
  onSubmit(ingredient:Ingredient){
  	const newIngredient = new Ingredient(ingredient.name, ingredient.amount);
  	if (!this.isAdd) {
  		this.sls.editItem(this.item, newIngredient);
  		this.onClear();
  	} else{
  		this.item = newIngredient;
  		this.sls.addItem(this.item);
  	}
  }
  onDelete(){
  	this.sls.deleteItem(this.item);
  	this.onClear();
  }
  onClear(){
  	this.isAdd = true; //enable user to add new data
  	this.cleared.emit(null); // remove data from the input
  }
}
