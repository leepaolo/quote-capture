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
  favoriteQuotes$ = this.favoriteQuotesSubject.asObservable;

  constructor(private http: HttpClient) {}

  // STEP 3 - Save quote to favorites
  saveQuoteToFavorites(quote: IQuote): void {
    const favorites = this.favoriteQuotesSubject.value;
    const isAlreadyFavorite = favorites.some((fav) => fav.id === quote.id);
    if (!isAlreadyFavorite) {
      favorites.push(quote);
      this.saveToLocalStorage(favorites);
    }
  }

  // STEP 4 - Check if quote is saved to favorites
  removeQuoteFromFavorites(quote: IQuote): void {
    let favorites = this.loadFromLocalStorage();
    favorites = favorites.filter((fav) => fav.id !== quote.id);
    this.saveToLocalStorage(favorites);
  }
  // STEP 5 - Remove quote from favorites
  isSavedToFavorites(quote: IQuote): boolean {
    const favorites = this.loadFromLocalStorage();
    return favorites.some((fav) => fav.id === quote.id);
  }

  // STEP 2 - Save favorites to local storage
  saveToLocalStorage(favorites: IQuote[]): void {
    console.log('Saving to local storage:', favorites);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  // STEP 1 - Create a method to load favorites from local storage
  loadFromLocalStorage(): IQuote[] {
    const favorites = localStorage.getItem('favorites');
    const parsedFavorites = favorites ? JSON.parse(favorites) : [];
    console.log('Loaded from local storage:', parsedFavorites);
    return favorites ? JSON.parse(favorites) : [];
  }
}
