import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Ingredient} from "../shared/ingredient";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html'
})
export class ShoppingListAddComponent implements OnInit, OnChanges {

  @Input() item: Ingredient;
  @Output() cleared = new EventEmitter();
  isAdd = true;

  constructor(private shoppilgListService: ShoppingListService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'].currentValue === null) {
      this.isAdd = true;
      this.item = new Ingredient(null, null);
      ShoppingListService
    }
    else {
      this.isAdd = false;
    }

  }

  onSubmit(ingredient: Ingredient) {
    const newIngredient = new Ingredient(ingredient.name, ingredient.amount);

    if (!this.isAdd) {
      this.shoppilgListService.editItem(this.item, newIngredient);
      this.onClear();
    }
    else {
      this.item = newIngredient;
      this.shoppilgListService.addItem(this.item);
    }
  }

  onDelete(){
    this.shoppilgListService.deleteItem(this.item);
    this.onClear();
  }

  onClear(){
    this.isAdd = true;
    this.cleared.emit(null);
  }

}
