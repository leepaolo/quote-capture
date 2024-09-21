import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../enviroments/enviroments';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { IQuote, IRoot } from '../models/quote.interface';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private readonly apiUrl = `${environment.API_BASE_URL}/quotes.json`;
  private loadQuotes$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getRandomQuotes(): Observable<IQuote[]> {
    this.loadQuotes$.next(true); // Set loading state to true before API call
    return this.http.get<IRoot>(this.apiUrl).pipe(
      map((response: IRoot) => {
        const quotes = response.contents.quotes;
        const randomQuotes = this.getRandomItems(quotes, 6);
        this.loadQuotes$.next(false); // Set loading state to false after successful response
        return randomQuotes; // Return the 6 random quotes
      }),
      catchError((error) => {
        console.error('Error fetching quotes:', error);
        this.loadQuotes$.next(false); // Ensure the loading state is set to false even on error
        // Return a fallback empty array in case of an error
        return of([]);
      })
    );
  }

  // Method to track loading state
  isLoading(): Observable<boolean> {
    return this.loadQuotes$.asObservable();
  }
  // Generic Type TEMPORARY
  private getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
