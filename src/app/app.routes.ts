import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { HomePageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
    {path: '', redirectTo: 'landing', pathMatch: 'full'},
    {path: 'landing', component: LandingComponent , title: 'Landing'},
    {path: 'home', component: HomePageComponent , title: 'Home'},
];
