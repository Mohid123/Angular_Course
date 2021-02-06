import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service'; //we import this to enable us to fetch any dish.


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

//@Input() --we were taking the dish as an input bcs we ar processing the info through the router. Also removed Input from the first import as well above
  dish!: Dish;

  constructor(private dishService: DishService, private route: ActivatedRoute, private location: Location) { }
  // To make all services available, we add them to the constructor. 

  ngOnInit(): void {
  	const id = this.route.snapshot.params['id'];
    this.dishService.getDish(id)
    .then(dish => this.dish = dish);
  	//snapshot Contains the information about a route associated with a component loaded.
  }

  goBack(): void {
  	this.location.back(); //ensures that we can return after viewing the dish.
  }

}
