// This is a separate file that is used to create the routes to and from he components
import { Routes } from '@angular/router';

//Add all the components

import { MenuComponent } from './app/menu/menu.component';
import { DishdetailComponent } from './app/dishdetail/dishdetail.component';
import { HomeComponent } from './app/home/home.component';
import { AboutComponent } from './app/about/about.component';
import { ContactComponent } from './app/contact/contact.component';

// Defining the routes inside a const object.
export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'dishdetail/:id', component: DishdetailComponent},
    {path: 'contactus', component: ContactComponent },
    {path: '', redirectTo: '/home', pathMatch: 'full'} // default home path
];