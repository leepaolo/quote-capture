import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuoteCardComponent } from '../../shared/quote-card/quote-card.component';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule, QuoteCardComponent],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.css',
})
export class QuoteListComponent {}
