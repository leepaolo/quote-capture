import { Pipe, PipeTransform } from '@angular/core';
import { IQuote } from '../models/quote.interface';

@Pipe({
  name: 'filterAuthor',
  standalone: true,
})
export class FilterAuthorPipe implements PipeTransform {
  transform(quotes: IQuote[], authorName: string): IQuote[] {
    if (!quotes) {
      return [];
    }

    if (!authorName) {
      return quotes; // If no filter, return all quotes
    }

    const normalizedAuthorName = authorName.trim().toLowerCase();

    return quotes.filter((quote) => {
      // Use "Anonymous" if the author field is empty or null
      const author = quote.author
        ? quote.author.trim().toLowerCase()
        : 'anonymous';
      return author.includes(normalizedAuthorName);
    });
  }
}
