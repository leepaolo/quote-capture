import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateQuoteService } from '../../../service/create-quote.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IQuote } from '../../../models/quote.interface';
import { QuoteCardComponent } from '../../shared/quote-card/quote-card.component';

@Component({
  selector: 'app-test-quote',
  standalone: true,
  imports: [CommonModule, QuoteCardComponent],
  templateUrl: './test-quote.component.html',
  styleUrl: './test-quote.component.css',
})
export class TestQuoteComponent implements OnInit, OnDestroy {
  private quotesSubject = new BehaviorSubject<IQuote[]>([]);
  quotes$ = this.quotesSubject.asObservable();

  private subscriptions = new Subscription();

  quotes: IQuote[] = [];

  constructor(private createQuoteService: CreateQuoteService) {}

  ngOnInit(): void {
    this.fetchQuotes();
    const quotesSub = this.quotes$.subscribe((quotes) => {
      this.quotes = quotes;
    });
    this.subscriptions.add(quotesSub);
  }

  onDiscardQuote(quote: IQuote): void {
    console.log('Discarding quote:', quote);
    const currentQuotes = this.quotesSubject.value;
    const updatedQuotes = currentQuotes.filter((q) => q.id !== quote.id);
    console.log('Updated quotes array:', updatedQuotes);
    this.quotesSubject.next(updatedQuotes);
  }

  onDeleteQuote(quote: IQuote): void {
    this.createQuoteService.deleteQuote(quote.id).subscribe({
      next: () => {
        console.log(`Quote with id ${quote.id} deleted successfully.`);
        this.fetchQuotes();
      },
      error: (err) => {
        console.error('Error deleting quote:', err);
      },
    });
  }

  trackById(index: number, item: IQuote): string {
    return item.id;
  }

  fetchQuotes(): void {
    const fetchSub = this.createQuoteService.getQuote().subscribe({
      next: (quotes) => {
        this.quotesSubject.next(quotes);
      },
      error: (err) => {
        console.error('Error fetching quotes:', err);
        // Optionally, handle the error (e.g., display a message)
      },
    });
    this.subscriptions.add(fetchSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
