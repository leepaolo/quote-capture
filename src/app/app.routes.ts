import { Routes } from '@angular/router';
import { QuoteListComponent } from './components/pages/quote-list/quote-list.component';
import { FavoriteQuotesComponent } from './components/pages/favorite-quotes/favorite-quotes.component';

export const routes: Routes = [
  { path: 'quotes', component: QuoteListComponent },
  { path: 'my-favorite-quotes', component: FavoriteQuotesComponent },
  { path: '**', redirectTo: 'quotes', pathMatch: 'full' },
];
