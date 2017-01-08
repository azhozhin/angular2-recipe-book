import {Routes} from '@angular/router';
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";

export const RECIPE_ROUTES: Routes = [
  {path: '', component: RecipeStartComponent, pathMatch: 'full'},
  {path: 'new', component: RecipeEditComponent},
  {path: ':id', component: RecipeDetailComponent},
  {path: ':id/edit', component: RecipeEditComponent},
];