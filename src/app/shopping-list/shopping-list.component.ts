import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients = [
    new Ingredient('Manzanas', 5),
    new Ingredient('Tomates', 10)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddedIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
