// Path: src\app\app.routes.ts
import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';


export const routes: Routes = [
    {path: '', redirectTo: 'portfolio', pathMatch: 'full'},
    {path: 'portfolio', component: PortfolioComponent , title: 'portfolio'},
    {path: 'landing', component: LandingComponent , title: 'Landing'},
    
];
