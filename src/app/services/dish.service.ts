import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs'; //parts of rxjs library can be imported not the whole library
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> { //can also directly use Promise.resolve but it cannot use functions.
    // We will use observables from rxjs to implement the Promise
    return of(DISHES).pipe(delay(2000));
// The code becomes much shorter by using the reactive approach. 4 lines becomes 1 line.
// Observables send out a stream of data so we use pipe to specify a certain data that we want to fetch from the stream

// THE OLD CODE APPROCH (below)
  	// return new Promise (
  	// 	resolve => {
  	// 		//simulate server latency with 2s delay using setTimeout
  	// 		setTimeout(() => resolve(DISHES), 2000);
  	//	}); //getDishes is a method that returns DISHES in an array from wherever the service is injected
  } 


  getDish(id: string): Observable<Dish> {  //for a specific dish. dish id must match the id supplied as the parameter
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  	// return new Promise(
  	// 	resolve => {
  	// 		setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
  	// 	}); 
  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  	// return new Promise(
  	// 	resolve => {
  	// 		setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000)
  	// 	}); //featured is boolean so it will return either true or false
  }

  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map(dish => dish.id ));
  }
}
