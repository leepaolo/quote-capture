import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IQuote } from '../../../models/quote.interface';
import { Observable, of, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { QuoteCardComponent } from '../../shared/quote-card/quote-card.component';
import { FavoriteService } from '../../../service/favorite.service';

@Component({
  selector: 'app-favorite-quotes',
  standalone: true,
  imports: [CommonModule, QuoteCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './favorite-quotes.component.html',
  styleUrl: './favorite-quotes.component.css',
})
export class FavoriteQuotesComponent implements OnInit, OnDestroy {
  quotes$!: Observable<IQuote[]>;
  private favoriteDestroy$ = new Subscription();

  constructor(private favorite: FavoriteService) {}

  ngOnInit(): void {
    this.quotes$ = this.favorite.favoriteQuotes$;
  }

  ngOnDestroy(): void {
    if (this.favoriteDestroy$) {
      this.favoriteDestroy$.unsubscribe();
    }
  }
}
