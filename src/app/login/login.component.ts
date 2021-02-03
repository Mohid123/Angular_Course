import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'; //matdialogs are used for opening closing modals
// and dialog boxes etc. 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	user = {username: '', password: '', remember: false};

  constructor(public dilaogref: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  onSubmit() {
  	console.log('User', this.user); //currently we are only logging in the user information inside our console.
  	//In MongoExpressNode course we will add the server and database link and complete this
  	this.dilaogref.close();
  }

}
