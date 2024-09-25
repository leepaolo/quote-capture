import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuoteListComponent } from '../quote-list/quote-list.component';

import { RouterOutlet } from '@angular/router';
import { QuotePersonalComponent } from '../quote-personal/quote-personal.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-quote-layout',
  standalone: true,
  imports: [
    CommonModule,
    QuoteListComponent,
    QuotePersonalComponent,
    RouterOutlet,
  ],

  templateUrl: './quote-layout.component.html',
  styleUrl: './quote-layout.component.css',
})
export class QuoteLayoutComponent {
  private authorFilter = new BehaviorSubject<string>(''); // Filter for author name
  filter$ = this.authorFilter.asObservable(); // Observable filter to pass to children

  onFilterChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Safely cast to HTMLInputElement
    this.authorFilter.next(inputElement.value); // Use the 'value' property of the input element
  }
}
