import { Component, Input } from '@angular/core';

import { Recipe } from '../../recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  //Property binding:
  @Input() recipe:Recipe; //get recipe from outsite (the html files)
  @Input() recipeId:number; //get the id from the index set on the tag

}
