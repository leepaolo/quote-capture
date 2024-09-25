import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { IQuote } from '../../../models/quote.interface';
import { FavoriteService } from '../../../service/favorite.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quote-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quote-card.component.html',
  styleUrl: './quote-card.component.css',
})
export class QuoteCardComponent implements OnInit, OnDestroy {
  @Input() quote!: IQuote;
  @Output() discardQuote = new EventEmitter<IQuote>();
  @Output() deleteQuote = new EventEmitter<IQuote>();
  @Output() filterByAuthor = new EventEmitter<string>();

  @Input() showSaveButton: boolean = false;
  @Input() showDiscardButton: boolean = false;
  @Input() showDeleteButton: boolean = false;

  @Input() bgColor: string = 'white';
  @Input() authorFilter: string = '';

  saveQuoteText: string = 'Save to Favorites';
  isSaved: boolean = false;
  discardQuoteText: string = 'Discard quote';
  isDiscarded: boolean = false;
  deleteQuoteText: string = 'Delete quote';
  isQuoteDeleted: boolean = false;

  hasCopied: boolean = false;

  private quoteDestroy$ = new Subscription();

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.isSaved = this.favoriteService.isSavedToFavorites(this.quote);
    this.updateSaveQuoteText();
  }

  get showQuote(): boolean {
    return this.quote.author
      .toLowerCase()
      .includes(this.authorFilter.toLowerCase());
  }

  private updateSaveQuoteText(): void {
    this.saveQuoteText = this.isSaved
      ? 'Remove from Favorites'
      : 'Save to Favorites';
  }

  toggleFavorite(): void {
    if (this.isSaved) {
      this.favoriteService.removeQuoteFromFavorites(this.quote);
    } else {
      this.favoriteService.saveQuoteToFavorites(this.quote);
    }
    this.isSaved = !this.isSaved;
    this.updateSaveQuoteText();
  }

  discardQuoteFromList(): void {
    this.discardQuote.emit(this.quote);
  }

  deleteQuoteFromList(): void {
    this.deleteQuote.emit(this.quote);
  }

  copyClipboard(): void {
    const textToCopy = `"${this.quote.quote}" - ${this.quote.author}`;
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        this.hasCopied = true; // Set the state to true after copying
        // Optionally, reset the state after a delay if you want the button to reappear
        setTimeout(() => {
          this.hasCopied = false;
        }, 4000); // Adjust the delay as needed
      },
      (err) => {
        console.error('Could not copy text: ', err);
        // Optionally, display an error message to the user
      }
    );
  }

  ngOnDestroy(): void {
    if (this.quoteDestroy$) {
      this.quoteDestroy$.unsubscribe();
    }
  }
}
