//import { provideRoutes } from '@angular/router'; //angular2
import { RouterModule, Routes } from '@angular/router'; //angular 4

import { RECIPE_ROUTES } from './recipes/recipes.routes';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

/* Angular 2
export const APP_ROUTES_PROVIDERS = [
  provideRoutes([
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'recipes', component: RecipesComponent},
    { path: 'shopping-list', component: ShoppingListComponent}

  ])
] */
const APP_ROUTES_PROVIDERS:Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    //{ path: 'recipes', component: RecipesComponent, children:childRouting},
    { path: 'recipes', component: RecipesComponent, children:RECIPE_ROUTES},
    { path: 'shopping-list', component: ShoppingListComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES_PROVIDERS);