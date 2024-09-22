import { Component, OnInit } from '@angular/core';
import { IQuote } from '../../../models/quote.interface';
import { Observable, of, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { QuoteCardComponent } from '../../shared/quote-card/quote-card.component';
import { FavoriteService } from '../../../service/favorite.service';

@Component({
  selector: 'app-favorite-quotes',
  standalone: true,
  imports: [CommonModule, QuoteCardComponent],
  templateUrl: './favorite-quotes.component.html',
  styleUrl: './favorite-quotes.component.css',
})
export class FavoriteQuotesComponent implements OnInit {
  quotes$!: Observable<IQuote[]>;
  private favoriteDestroy$ = new Subscription();

  constructor(private favorite: FavoriteService) {}

  ngOnInit(): void {
    const favorites = this.favorite.loadFromLocalStorage();
    console.log('Favorites loaded in component:', favorites);
    this.quotes$ = of(favorites);
  }

  onDestroy(): void {
    if (this.favoriteDestroy$) {
      this.favoriteDestroy$.unsubscribe();
    }
  }
}
