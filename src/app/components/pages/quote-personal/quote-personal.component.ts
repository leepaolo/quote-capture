import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateQuoteService } from '../../../service/create-quote.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
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

  constructor(private createQuoteService: CreateQuoteService) {
    // Subscribe to the quotes observable from the service
    this.quotes$ = this.createQuoteService.getQuotes();
  }

  ngOnInit(): void {
    // No need to manually fetch quotes; the service handles it
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
    // No subscriptions to manage since we're using the async pipe
  }
}
