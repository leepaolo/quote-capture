import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IQuote } from '../../../models/quote.interface';

@Component({
  selector: 'app-quote-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-card.component.html',
  styleUrl: './quote-card.component.css',
})
export class QuoteCardComponent {
  @Input() quote!: IQuote;
}
