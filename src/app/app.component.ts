import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CreateNewQuoteBarComponent } from './components/shared/create-new-quote-bar/create-new-quote-bar.component';
import { QuoteLayoutComponent } from './components/pages/quote-layout/quote-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    CreateNewQuoteBarComponent,
    QuoteLayoutComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
