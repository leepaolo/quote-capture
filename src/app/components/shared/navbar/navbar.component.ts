import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../parts/button.component';
import {
  QUOTE_URL,
  MY_FAVORITE_QUOTE_URL,
} from '../../pages/constants/navabr.constant';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  quoteList: string = 'Quotes';
  myFavoriteQuotes: string = 'My Favorite Quotes';
  createNewQuote: string = 'Create New Quote';

  QUOTE_URL = QUOTE_URL;
  MY_FAVORITE_QUOTE_URL = MY_FAVORITE_QUOTE_URL;
}
