import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuoteCardComponent } from '../../shared/quote-card/quote-card.component';
import { QuoteService } from '../../../service/quote.service';
import { IQuote, IRoot } from '../../../models/quote.interface';
import { catchError, Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule, QuoteCardComponent],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.css',
})
export class QuoteListComponent implements OnInit {
  quotes$!: Observable<IQuote[]>;
  isLoading$!: Observable<boolean>;
  private quoteDestroy$ = new Subscription();

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.isLoading$ = this.quoteService.isLoading();
    this.quotes$ = this.quoteService.getRandomQuotes().pipe(
      catchError((error) => {
        console.error('Error fetching quotes:', error);
        return of([]); // Return an empty array on error
      })
    );
  }

  ngOnDestroy(): void {
    if (this.quoteDestroy$) {
      this.quoteDestroy$.unsubscribe();
    }
  }
}
