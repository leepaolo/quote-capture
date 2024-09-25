import { Routes } from '@angular/router';
import { FavoriteQuotesComponent } from './components/pages/favorite-quotes/favorite-quotes.component';
import { QuoteLayoutComponent } from './components/pages/quote-layout/quote-layout.component';
import { QuotePersonalComponent } from './components/pages/quote-personal/quote-personal.component';

export const routes: Routes = [
  { path: 'quotes', component: QuoteLayoutComponent }, // Use QuoteLayoutComponent here
  { path: 'my-favorite-quotes', component: FavoriteQuotesComponent },
  { path: 'quote-personal', component: QuotePersonalComponent },
  { path: '**', redirectTo: 'quotes', pathMatch: 'full' },
];
