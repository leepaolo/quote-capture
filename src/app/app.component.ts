import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './components/pages/layout/layout.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CreateNewQuoteBarComponent } from './components/shared/create-new-quote-bar/create-new-quote-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LayoutComponent,
    NavbarComponent,
    CreateNewQuoteBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
