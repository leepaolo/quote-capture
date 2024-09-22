import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IQuote } from '../../../models/quote.interface';
import { FavoriteQuotesComponent } from '../../pages/favorite-quotes/favorite-quotes.component';
import { FavoriteService } from '../../../service/favorite.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quote-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-card.component.html',
  styleUrl: './quote-card.component.css',
})
export class QuoteCardComponent implements OnInit {
  @Input() quote!: IQuote;
  saveQuote: string = 'Save to Favorites';
  isSaved: boolean = false;

  discardQuote: string = 'Discard quote';
  isDiscarded: boolean = false;

  private quoteDestroy$ = new Subscription();

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.isSaved = this.favoriteService.isSavedToFavorites(this.quote);
    this.updateSaveQuoteText();
  }

  private updateSaveQuoteText(): void {
    this.saveQuote = this.isSaved
      ? 'Remove from Favorites'
      : 'Save to Favorites';
  }

  toggleFavorite(): void {
    if (this.isSaved) {
      this.favoriteService.removeQuoteFromFavorites(this.quote);
    } else {
      this.favoriteService.saveQuoteToFavorites(this.quote);
    }
    this.isSaved = !this.isSaved;
    this.updateSaveQuoteText();
  }

  onDestroy(): void {
    if (this.quoteDestroy$) {
      this.quoteDestroy$.unsubscribe();
    }
  }
}
