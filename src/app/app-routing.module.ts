import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from '../routes'; //imorting the routes const

//const routes: Routes = [];

@NgModule({
  imports: [
  RouterModule.forRoot(routes) //the same routes const created in routes.ts file
  ],
  exports: [
  RouterModule //we export the module to make it available for our app module
  ]
})
export class AppRoutingModule { }
