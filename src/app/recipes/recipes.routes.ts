//import { RouterModule, Routes } from '@angular/router';
import { Routes } from '@angular/router';

import { RecipeStartComponent } from './recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';


//Option 1
export const RECIPE_ROUTES: Routes = [
	//order important in angular 2
    { path: '', component: RecipeStartComponent},
    { path: 'new', component: RecipeEditComponent},
    { path: ':id', component: RecipeDetailComponent},
    { path: ':id/edit', component: RecipeEditComponent},
];

/*
//option 2
const RECIPE_ROUTES:Routes = [
	//order important in angular 2
    { path: '', component: RecipeStartComponent},
    { path: 'new', component: RecipeEditComponent},
    { path: ':id', component: RecipeDetailComponent},
    { path: ':id/edit', component: RecipeEditComponent},
];
export const childRouting = RouterModule.forChild(RECIPE_ROUTES);
*/