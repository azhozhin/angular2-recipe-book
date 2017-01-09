import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {Recipe} from "../recipe";
import {RecipeService} from "../recipe.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit, OnDestroy {


  recipes: Recipe[] = [];
  private subscrition: Subscription;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.subscrition = this.recipeService.recipesChanged.subscribe((recipes) => {
      this.recipes = recipes;
    })
  }

  ngOnDestroy() {
    this.subscrition.unsubscribe();
  }

  onSelected(recipe: Recipe) {
  }

}
