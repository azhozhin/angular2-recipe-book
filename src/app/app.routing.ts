import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';
import {PageNotFoundComponent} from './page-not-found.component';

const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'recipes', loadChildren: 'app/recipes/recipes.module#RecipesModule'},
  {path: 'shopping-list', loadChildren: 'app/shopping-list/shopping-list.module#ShoppingListModule'},
  {path: '**', component: PageNotFoundComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
