import { Component } from '@angular/core';

import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private recipeService:RecipeService ) { }

  onStore(){
  	//We subscribe to get the observable that will allow us to send the request
  	this.recipeService.storeData().subscribe(
  		data => console.log(data),
  		error => console.error(error )
  	);
  }
  onFetch(){
  	this.recipeService.fetchData();
  }
}
