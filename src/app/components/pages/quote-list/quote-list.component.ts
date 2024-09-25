import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { QuoteService } from '../../../service/quote.service';
import { IQuote, IRoot } from '../../../models/quote.interface';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  Subscription,
} from 'rxjs';

import { QuotePersonalComponent } from '../quote-personal/quote-personal.component';
import { QuoteCardComponent } from '../../shared/quote-card/quote-card.component';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule, QuoteCardComponent, QuotePersonalComponent],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.css',
})
export class QuoteListComponent implements OnInit, OnDestroy {
  isLoading$!: Observable<boolean>;
  private quoteDestroy$ = new Subscription();
  private quotesSubject = new BehaviorSubject<IQuote[]>([]);
  quotes$ = this.quotesSubject.asObservable();

  @Input() authorFilter!: Observable<string>; // Input for the author filter
  filteredQuotes: IQuote[] = [];

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.isLoading$ = this.quoteService.isLoading();

    // Subscribe to the quote service to get the quotes
    this.quoteDestroy$ = this.quoteService
      .getRandomQuotes()
      .pipe(
        catchError((error) => {
          console.error('Error fetching quotes:', error);
          return of([]); // Return an empty array on error
        })
      )
      .subscribe((quotes) => {
        console.log('Quotes fetched:', quotes); // Log to verify quotes are fetched
        this.quotesSubject.next(quotes); // Set the quotes
        this.filteredQuotes = this.applyFilter(quotes); // Apply filter initially
      });

    // Listen to filter changes and apply them to the quotes after they are loaded
    this.authorFilter?.subscribe((authorName) => {
      const quotes = this.quotesSubject.value ?? []; // Add a fallback for null
      console.log('Filtering quotes by:', authorName); // Log filtering action
      this.filteredQuotes = this.applyFilter(quotes, authorName);
    });
  }

  ngOnDestroy(): void {
    if (this.quoteDestroy$) {
      this.quoteDestroy$.unsubscribe();
    }
  }

  applyFilter(quotes: IQuote[], authorName: string = ''): IQuote[] {
    if (!authorName) return quotes; // If no filter, return all quotes
    return quotes.filter((quote) =>
      quote.author.toLowerCase().includes(authorName.toLowerCase())
    );
  }

  onDiscardQuote(quote: IQuote): void {
    const currentQuotes = this.quotesSubject.value;
    const updatedQuotes = currentQuotes.filter((q) => q.id !== quote.id);
    this.quotesSubject.next(updatedQuotes);
    this.filteredQuotes = this.applyFilter(updatedQuotes); // Reapply filter
  }

  trackById(index: number, item: IQuote): string {
    return item.id;
  }
}
