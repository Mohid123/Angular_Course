import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
// import { DISHES } from '../shared/dishes'; no longer needed bcs we are using a service to fetch the dishes
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {                         

dishes!: Dish[]; // or dishes = DISHES; simply. Typescript recognizes the type and matches
errMess!: string; //to catch error in case dishes are not returned

//selectedDish!: Dish;

  constructor(private dishService: DishService, @Inject('BaseURL') public BaseURL:any) {
  }

  ngOnInit(): void {
    //this.dishes = this.dishService.getDishes(); //without promise
    this.dishService.getDishes()
    .subscribe((dishes) => this.dishes = dishes,
      errmess => this.errMess = <any>errmess); //error catching which the subscribe observable allows us to use
  }
//through this our menu component will call upon the dishes service and display it according to the menu template
// remember that we already created the getDishes metjod in our service  

 // onSelect(dish: Dish) {
 //    this.selectedDish = dish;
 //  }
//onSelect is used here to show the dish we select with details and comments
}

//NOTE: The service we have used here is very basic and is only fetching data that we provided in an object file.
//Generally, services are used to fetch data from servers and that takes a longer time. For that we have
//asynchronous requests (Reactive JS) and promises.