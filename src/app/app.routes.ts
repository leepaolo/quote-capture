import { Routes } from '@angular/router';
import { QuoteListComponent } from './components/pages/quote-list/quote-list.component';
import { FavoriteQuotesComponent } from './components/pages/favorite-quotes/favorite-quotes.component';
import { TestQuoteComponent } from './components/pages/test-quote/test-quote.component';
import { QuoteLayoutComponent } from './components/pages/quote-layout/quote-layout.component';

export const routes: Routes = [
  { path: 'quotes', component: QuoteLayoutComponent }, // Use QuoteLayoutComponent here
  { path: 'my-favorite-quotes', component: FavoriteQuotesComponent },
  { path: 'test-quotes', component: TestQuoteComponent },
  { path: '**', redirectTo: 'quotes', pathMatch: 'full' },
];
