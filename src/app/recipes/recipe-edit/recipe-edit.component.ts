import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {Subscription} from "rxjs";
import {Recipe} from "../recipe";
import {FormArray, FormGroup, FormControl, Validator, Validators, FormBuilder} from "@angular/forms";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  recipeForm: FormGroup;
  private recipe: Recipe;
  private recipeId: number;
  private subscription: Subscription;
  private isNew = false;


  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.recipeId = params['id'];
          this.recipe = this.recipeService.getRecipe(this.recipeId);
        }
        else {
          this.isNew = true;
          this.recipe = null;
        }
        this.initForm();
      }
    )
  }

  onSubmit() {

    const newRecipe: Recipe = this.recipeForm.value;
    if (this.isNew) {
      this.recipeService.addRecipe(newRecipe);
    }
    else {
      this.recipeService.editRecipe(this.recipe, newRecipe);
    }
    this.navigateBack();
  }

  onCancel() {
    this.navigateBack();
  }

  onAddItem(name: string, amount: string) {
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      this.buildIngredientFormGroup(name, parseInt(amount))
    )
  }

  onRemoveItem(i: number) {
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(i);
  }

  navigateBack() {
    this.router.navigate(['../']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initForm() {

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients: FormArray = new FormArray([]);

    if (!this.isNew) {
      if (this.recipe.hasOwnProperty('ingredients')) {
        for (let i = 0; i < this.recipe.ingredients.length; i++) {
          let ingredient = this.recipe.ingredients[i];
          recipeIngredients.push(
            this.buildIngredientFormGroup(ingredient.name, ingredient.amount))
        }
      }

      recipeName = this.recipe.name;
      recipeImagePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
    }

    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImagePath, Validators.required],
      description: [recipeDescription, Validators.required],
      ingredients: recipeIngredients,
    })
  }

  private buildIngredientFormGroup(name: string, amount: number) {
    return new FormGroup({
      name: new FormControl(name, Validators.required),
      amount: new FormControl(amount, [Validators.required, Validators.pattern("\\d+")])
    })
  }

}
