import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs'; //parts of rxjs library can be imported not the whole library
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
 
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes') //for getting dishes
    .pipe(catchError(this.processHTTPMsgService.handleError)); //for error handling
  }


    //can also directly use Promise.resolve but it cannot use functions.
    // We will use observables from rxjs to implement the Promise

    //REACTIVE APPROACH
    //return of(DISHES).pipe(delay(2000));

// The code becomes much shorter by using the reactive approach. 4 lines becomes 1 line.
// Observables send out a stream of data so we use pipe to specify a certain data that we want to fetch from the stream

// THE OLD CODE APPROCH (below)
  	// return new Promise (
  	// 	resolve => {
  	// 		//simulate server latency with 2s delay using setTimeout
  	// 		setTimeout(() => resolve(DISHES), 2000);
  	//	}); //getDishes is a method that returns DISHES in an array from wherever the service is injected
 


  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //for a specific dish. dish id must match the id supplied as the parameter
  //REACTIVE APPROACH
    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));

    //OLD APPROACH
    // return new Promise(
    //   resolve => {
    //     setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    //   }); 

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes))
    .pipe(catchError(this.processHTTPMsgService.handleError));;
  }

//REACTIVE APPROACH
  //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));

  //OLD APPROACH
    // return new Promise(
    //   resolve => {
    //     setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000)
    //   }); //featured is boolean so it will return either true or false

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error => error)); //we do not need to explicictly catch the error like the ones from above
  } //bcs getDishIds is already using getDishes( which already has error handler in place).

  //return of(DISHES.map(dish => dish.id ));
}
