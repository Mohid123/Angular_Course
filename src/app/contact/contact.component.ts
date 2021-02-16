import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  { Feedback, ContactType } from '../shared/feedback';
import { flyinout, expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

//ViewChild allows access to child elements in the DOM
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyinout]': 'true',
    'style': 'display: block;'
  },
  animations: [
  flyinout(),
  expand()
  ]
})
export class ContactComponent implements OnInit {
	@ViewChild('fform') feedbackFormDirective:any; //form gets reset back to initial values as specified below

	feedbackForm!: FormGroup;
	feedback!: Feedback;
  feedbackcopy!: Feedback;
  feedErrMess!: string;
	contactType = ContactType;

  isLoading!: boolean
  isResponsive!: boolean;

	formErrors: any = {
		'firstname': '',
		'lastname': '',
		'telnum': '',
		'email': ''
	};

// these msgs will appear when form errors occur. all validaton msgs are defined in code as shown
	validationMessages: any = {
		'firstname': {
			'required': 'First Name is Required.',
			'minlength': 'First Name must be at least 2 characters long.',
			'maxlength': 'First Name must be at least 25 characters long.'
		},
		'lastname': {
			'required': 'Last Name is Required.',
			'minlength': 'Last Name must be at least 2 characters long.',
			'maxlength': 'Last Name must be at least 25 characters long.'
		},
		'telnum': {
			'required': 'Telephone Number is Required',
			'pattern': 'Tel. Number must contain only numeric values'
		},
		'email': {
			'required': 'Email is Required',
			'email': 'Email is not valid'
		}
	};

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {

  	this.createForm();
    this.isLoading = false;
    this.isResponsive = false;
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: [0, [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges //valueChanges is an angular built in observable.
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //(re)set form validaton messages
  }

  onValueChanged(data?: any) {
  	if (!this.feedbackForm) { return; }
  	const form = this.feedbackForm;
  	for (const field in this.formErrors) {
  		if (this.formErrors.hasOwnProperty(field)) {
  			// clear previous error message
  			this.formErrors[field] = '';
  			const control = form.get(field);
  			if (control && control.dirty && !control.valid) {
  				const messages = this.validationMessages[field];
  				for (const key in control.errors) {
  					if (control.errors.hasOwnProperty(key)) {
  						this.formErrors[field] += messages[key] + ' ';
  					}
  				}
  			}
  		}
  	}
  }

onSubmit() {
    this.isLoading = true;
    this.feedback = this.feedbackForm.value;
    //console.log(this.feedback);
    this.feedbackService.submitFeedback(this.feedback)
      .subscribe(feedback => {
          this.feedback = feedback;
          console.log(feedback);
        } ,
        errmess => {
          this.feedback = <any>null;
          this.feedbackcopy = <any>null;
          this.feedErrMess = <any>errmess;
        } ,
        () => {
          this.isResponsive = true;
          setTimeout(() => {
              this.isResponsive = false;
              this.isLoading = false;
            } , 5000
          );
        });
    this.feedbackForm.reset({
      firstname: '' ,
      lastname: '' ,
      telnum: '' ,
      email: '' ,
      agree: false ,
      contacttype: 'None' ,
      message: ''
    });
  }


}
