import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuoteListComponent } from '../quote-list/quote-list.component';

import { RouterOutlet } from '@angular/router';
import { QuotePersonalComponent } from '../quote-personal/quote-personal.component';

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
export class QuoteLayoutComponent {}
