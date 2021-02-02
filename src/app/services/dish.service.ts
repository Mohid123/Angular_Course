import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Dish[] {
  	return DISHES; //getDishes is a method that returns DISHES in an array from wherever the service is injected
  }

  getDish(id: string): Dish {  //for a specific dish.
  	return DISHES.filter((dish) => (dish.id === id))[0]; //dish id must match the id supplied as the parameter
  }

  getFeaturedDish(): Dish {
  	return DISHES.filter((dish) => dish.featured)[0]; //featured is boolean so it will return either true or false
  }
}
