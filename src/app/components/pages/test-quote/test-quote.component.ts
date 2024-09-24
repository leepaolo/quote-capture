import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CreateQuoteService } from '../../../service/create-quote.service';
import { Subscription } from 'rxjs';
import { IQuote } from '../../../models/quote.interface';

@Component({
  selector: 'app-test-quote',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-quote.component.html',
  styleUrl: './test-quote.component.css',
})
export class TestQuoteComponent implements OnInit {
  private quoteDestroy$ = new Subscription();

  quotes: IQuote[] = [];

  constructor(private createQuoteService: CreateQuoteService) {}

  ngOnInit(): void {
    if (this.quoteDestroy$) {
      this.fetchQuotes();
    }
  }

  fetchQuotes(): void {
    this.createQuoteService.getQuote().subscribe((quote) => {
      this.quotes = quote;
    });
  }

  ngDestroy(): void {
    if (this.quoteDestroy$) {
      this.quoteDestroy$.unsubscribe();
    }
  }
}
