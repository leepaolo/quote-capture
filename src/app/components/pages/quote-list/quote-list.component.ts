import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuoteCardComponent } from '../../shared/quote-card/quote-card.component';
import { QuoteService } from '../../../service/quote.service';
import { IQuote, IRoot } from '../../../models/quote.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule, QuoteCardComponent],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.css',
})
export class QuoteListComponent implements OnInit {
  quotes: IQuote[] = [];
  isLoading = false;
  private quoteDestroy$ = new Subscription();

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.quoteService
      .isLoading()
      .subscribe((loading) => (this.isLoading = loading));
    this.getQuotes(); // Updated to fetch multiple quotes
  }

  getQuotes() {
    // Fetch 6 random quotes and assign them to the array
    this.quoteService.getRandomQuotes().subscribe((randomQuotes: IQuote[]) => {
      this.quotes = randomQuotes; // Store the 6 random quotes in the quotes array
    });
  }

  ngOnDestroy(): void {
    if (this.quoteDestroy$) {
      this.quoteDestroy$.unsubscribe();
    }
  }
}
