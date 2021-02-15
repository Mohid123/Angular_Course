import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service'; //we import this to enable us to fetch any dish.
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import {visibility, flyinout, expand} from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyinout]': 'true',
    'style': 'display: block;'
  },
  animations: [
  flyinout(),
  expand(),
  visibility()
  ]
})
export class DishdetailComponent implements OnInit {
  @ViewChild('fform') commentFormDirective:any;

//@Input() --we were taking the dish as an input bcs we ar processing the info through the router. Also removed Input from the first import as well above
  dish!: Dish;
  dishIds!: string[];
  prev!: string;
  next!: string;
  errMess!: string; //to catch error in case dishes are not returned
  dishcopy!: Dish;
  visibility = 'shown';


  commentForm!: FormGroup;
  comment!: Comment;
  //disher!: Dish;

  formErrors: any = {
    'author': '',
    'comment': ''
  };

  validationResponses: any = {
    'author': {
      'required': 'Author Name is Required',
      'minlength': 'Author Name must be at least 2 characters',
      'maxlength': 'Author Name cannot be more than 25 characters long'
    },
    'comment': {
      'required': 'Comment is Required',
      'minlength': 'Comment must be atleast 1 character/s long'
    }
  };

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL:any) {

    this.createForm();
  }


  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 5,
      updateSetting(event:any) {
        this.gridsize = event.value;
      },
      comment: ['', [Validators.required, Validators.minLength(1)]]
    });

    //using valueChanges observable

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); 
  }

onValueChanged(data?: any) { //? means parameter is optional
  if (!this.commentForm) { //form not created then return nothing 
    return;
  }
  const form = this.commentForm; //make it easier to use
  for (const field in this.formErrors) { //check all the form fields 
    if(this.formErrors.hasOwnProperty(field)) { // clear any previous changes
      this.formErrors[field] = ''; //hasOwnProperty checks for any values inside form field; here it is error messages
      const control = form.get(field); //control catches values for each field
      if(control && control.dirty && !control.valid) { //check these three conditions
        const messages = this.validationResponses[field];
        for (const key in control.errors) {
          if(control.errors.hasOwnProperty(key)) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }
}


  
// To make all services available, we add them to the constructor. 
  ngOnInit(): void {
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
//const id = this.route.snapshot.params['id']; //snapshot takes a parameter at that particular point in time with params
//this.dishService.getDish(id) //params is a built in observable
    this.route.params.pipe(switchMap((params: Params) => {this.visibility = 'hidden'; return this.dishService.getDish(params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
      errmess => this.errMess = <any>errmess);
  	//snapshot Contains the information about a route associated with a component loaded.
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length]; //this is done to wrap
    //around and fetch the last item of the array, when the index is zero
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length]; //if we are at the last
    //item of the array, then it will wrap around and fetch the first item again
  }

  goBack(): void {
  	this.location.back(); //ensures that we can return after viewing the dish.
  }


//FORM SUBMISSION MESSAGES AND RESPONSE
  onSubmit() {
  this.comment = this.commentForm.value;
  this.comment.date = new Date().toISOString();
  this.dishcopy.comments.push(this.comment);
  this.dishService.putDish(this.dishcopy)
  .subscribe(dish => {
    this.dish = dish; this.dishcopy = dish;
  },
  errmess => {this.dish != null; this.dishcopy != null; this.errMess = <any>errmess;});
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: 5
    });
}

}

//So, what happens is that whenever the params observable changes value, which means that the route
// parameter changes value, then immediately, the switch map operator will take the params value, and 
//then do a getDish from my dishService. So, this would be automatically initiated, and this will be 
//available as the other observable that is emitted by doing this switch map operator on this observable. 
//So, we are creating a new observable which is the getDish, which is going to return the dish object here. 
//Now, once we get the getDish there, then that can now be available as an observable. I just subscribe to 
//that observable using the subscribe here. Then, there I obtain the dish. This dish is obtained by doing
// this getDish here. That dish, then I can make use to map it into my dish variable that I've declared earlier.
// So, this way, my dish now gets updated. So, any time the params observable changes, my dish will get
// updated to the new dish. So, notice how I'm taking one observable, the params observable, and then 
//I'm mapping the params observable into another observable which is basically going in fetching the
// dish value from my dishService, and then making that available as an observable. Then, I'm subscribing
// to that observable here, and then thereby, I'm getting the dish value here, and then I'm mapping the dish
// value or rather making the dish variable equal to the dish value here. 