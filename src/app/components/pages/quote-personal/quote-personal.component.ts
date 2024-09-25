import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CreateQuoteService } from '../../../service/create-quote.service';
import { Observable, Subscription } from 'rxjs';
import { IQuote } from '../../../models/quote.interface';
import { QuoteCardComponent } from '../../shared/quote-card/quote-card.component';

@Component({
  selector: 'app-quote-personal',
  standalone: true,
  imports: [CommonModule, QuoteCardComponent],

  templateUrl: './quote-personal.component.html',
  styleUrl: './quote-personal.component.css',
})
export class QuotePersonalComponent implements OnInit, OnDestroy {
  quotes$: Observable<IQuote[]>;
  filteredQuotes: IQuote[] = [];
  private quotesSubscription!: Subscription;

  @Input() authorFilter!: Observable<string>; // Input for the author filter

  constructor(private createQuoteService: CreateQuoteService) {
    this.quotes$ = this.createQuoteService.getQuotes();
  }

  ngOnInit(): void {
    // Subscribe to the quotes and filter them based on the author filter
    this.quotesSubscription = this.quotes$.subscribe((quotes) => {
      this.filteredQuotes = quotes; // Initial set of quotes
      this.applyFilter(quotes); // Apply initial filter
    });

    // Subscribe to the filter and apply it to the quotes
    this.authorFilter.subscribe((authorName) => {
      const currentQuotes = this.filteredQuotes; // Use filtered quotes
      this.filteredQuotes = this.applyFilter(currentQuotes, authorName);
    });
  }

  applyFilter(quotes: IQuote[], authorName: string = ''): IQuote[] {
    if (!authorName) return quotes; // If no filter, return all quotes
    return quotes.filter((quote) =>
      quote.author.toLowerCase().includes(authorName.toLowerCase())
    );
  }

  onDeleteQuote(quote: IQuote): void {
    this.createQuoteService.deleteQuote(quote.id).subscribe({
      next: () => {
        console.log(`Quote with id ${quote.id} deleted successfully.`);
        // No need to call fetchQuotes(); the service updates the BehaviorSubject
      },
      error: (err) => {
        console.error('Error deleting quote:', err);
      },
    });
  }

  trackById(index: number, item: IQuote): string {
    return item.id;
  }

  ngOnDestroy(): void {
    if (this.quotesSubscription) {
      this.quotesSubscription.unsubscribe();
    }
  }
}
