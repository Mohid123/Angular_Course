import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> { //can directly use Promise.resolve but it cannot use functions.
  	return new Promise (
  		resolve => {
  			//simulate server latency with 2s delay using setTimeout
  			setTimeout(() => resolve(DISHES), 2000);
  		}); //getDishes is a method that returns DISHES in an array from wherever the service is injected
  } 


  getDish(id: string): Promise<Dish> {  //for a specific dish. dish id must match the id supplied as the parameter
  	return new Promise(
  		resolve => {
  			setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
  		}); 
  }

  getFeaturedDish(): Promise<Dish> {
  	return new Promise(
  		resolve => {
  			setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000)
  		}); //featured is boolean so it will return either true or false
  }
}
