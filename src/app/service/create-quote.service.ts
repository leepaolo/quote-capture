import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroments';
import { BehaviorSubject, Observable } from 'rxjs';
import { IQuote } from '../models/quote.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CreateQuoteService {
  private readonly serverBaseUrl = environment.API_SERVER_BASE_URL;
  private readonly quoteUrl = `${this.serverBaseUrl}/new-quotes`;

  // BehaviorSubject to store the quotes
  private quotesSubject = new BehaviorSubject<IQuote[]>([]);
  public quotes$ = this.quotesSubject.asObservable();

  constructor(private http: HttpClient) {
    // Fetch initial quotes when the service is instantiated
    this.fetchQuotes();
  }

  // Fetch quotes from the server and update the BehaviorSubject
  private fetchQuotes(): void {
    this.http.get<IQuote[]>(this.quoteUrl).subscribe(
      (quotes) => this.quotesSubject.next(quotes),
      (error) => console.error('Error fetching quotes:', error)
    );
  }

  // Get the quotes observable
  getQuotes(): Observable<IQuote[]> {
    return this.quotes$;
  }

  // Add a new quote and update the BehaviorSubject
  addQuote(quote: IQuote): Observable<IQuote> {
    return this.http.post<IQuote>(this.quoteUrl, quote).pipe(
      tap((newQuote) => {
        const currentQuotes = this.quotesSubject.value;
        this.quotesSubject.next([...currentQuotes, newQuote]);
      })
    );
  }

  // Delete a quote and update the BehaviorSubject
  deleteQuote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.quoteUrl}/${id}`).pipe(
      tap(() => {
        const currentQuotes = this.quotesSubject.value;
        const updatedQuotes = currentQuotes.filter((q) => q.id !== id);
        this.quotesSubject.next(updatedQuotes);
      })
    );
  }
}
