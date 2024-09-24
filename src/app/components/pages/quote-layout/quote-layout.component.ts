import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuoteListComponent } from '../quote-list/quote-list.component';
import { TestQuoteComponent } from '../test-quote/test-quote.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-quote-layout',
  standalone: true,
  imports: [CommonModule, QuoteListComponent, TestQuoteComponent, RouterOutlet],
  templateUrl: './quote-layout.component.html',
  styleUrl: './quote-layout.component.css',
})
export class QuoteLayoutComponent {}
