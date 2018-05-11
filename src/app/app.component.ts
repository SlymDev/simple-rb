import { Component } from '@angular/core';

import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[RecipeService] //for making the service availlable in the whole app
})
export class AppComponent {
  title = 'app';
}