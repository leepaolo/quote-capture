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

  getRandomQuotes(): Observable<IQuote> {
    this.loadQuotes$.next(true); // Set loading state to true before API call
    return this.http.get<IRoot>(this.apiUrl).pipe(
      map((response: IRoot) => {
        this.loadQuotes$.next(false); // Set loading state to false after successful response
        return response.contents.quotes[0]; // Return the first quote from the response
      }),
      catchError((error) => {
        console.error('Error fetching quote:', error);
        this.loadQuotes$.next(false); // Ensure the loading state is set to false even on error
        // Return a fallback quote in case of an error
        return of({
          quote: 'Error fetching quote. Please try again later.',
          author: 'Anonymous',
          length: '0',
          tags: [],
          category: '',
          id: '',
        } as IQuote);
      })
    );
  }

  // Method to track loading state
  isLoading(): Observable<boolean> {
    return this.loadQuotes$.asObservable();
  }
}
