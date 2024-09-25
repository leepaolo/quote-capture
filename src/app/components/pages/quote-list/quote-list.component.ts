import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuoteCardComponent } from '../../shared/quote-card/quote-card.component';
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

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule, QuoteCardComponent, QuotePersonalComponent],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.css',
})
export class QuoteListComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  private quoteDestroy$ = new Subscription();

  private quotesSubject = new BehaviorSubject<IQuote[]>([]);
  quotes$ = this.quotesSubject.asObservable();

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.isLoading$ = this.quoteService.isLoading();

    this.quoteDestroy$ = this.quoteService
      .getRandomQuotes()
      .pipe(
        catchError((error) => {
          console.error('Error fetching quotes:', error);
          return of([]); // Return an empty array on error
        })
      )
      .subscribe((quotes) => {
        this.quotesSubject.next(quotes);
      });
  }

  ngOnDestroy(): void {
    if (this.quoteDestroy$) {
      this.quoteDestroy$.unsubscribe();
    }
  }

  onDiscardQuote(quote: IQuote): void {
    console.log('Discarding quote:', quote);
    const currentQuotes = this.quotesSubject.value;
    const updatedQuotes = currentQuotes.filter((q) => q.id !== quote.id);
    console.log('Updated quotes array:', updatedQuotes);
    this.quotesSubject.next(updatedQuotes);
  }

  trackById(index: number, item: IQuote): string {
    return item.id;
  }
}
