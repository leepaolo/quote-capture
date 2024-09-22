import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IQuote } from '../models/quote.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoriteQuotesSubject = new BehaviorSubject<IQuote[]>(
    this.loadFromLocalStorage()
  );
  favoriteQuotes$ = this.favoriteQuotesSubject.asObservable();

  constructor() {}

  // STEP -3 Add the quote to the favorites
  saveQuoteToFavorites(quote: IQuote): void {
    const favorites = this.favoriteQuotesSubject.value;
    if (!favorites.some((fav) => fav.id === quote.id)) {
      const updatedFavorites = [...favorites, quote];
      this.favoriteQuotesSubject.next(updatedFavorites);
      this.saveToLocalStorage(updatedFavorites);
    }
  }

  // STEP - 4 Check if the quote is saved to favorites
  isSavedToFavorites(quote: IQuote): boolean {
    return this.favoriteQuotesSubject.value.some((fav) => fav.id === quote.id);
  }

  // STEP - 5 Remove the quote from favorites
  removeQuoteFromFavorites(quote: IQuote): void {
    const updatedFavorites = this.favoriteQuotesSubject.value.filter(
      (fav) => fav.id !== quote.id
    );
    this.favoriteQuotesSubject.next(updatedFavorites);
    this.saveToLocalStorage(updatedFavorites);
  }

  // STEP -2 Save the favorites to local storage
  private saveToLocalStorage(favorites: IQuote[]): void {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  //  STEP 1 - Load the favorites from local storage
  private loadFromLocalStorage(): IQuote[] {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }
}
