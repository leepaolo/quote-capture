import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroments';
import { Observable } from 'rxjs';
import { IQuote } from '../models/quote.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateQuoteService {
  private readonly serverBaseUrl = environment.API_SERVER_BASE_URL;
  private readonly quoteUrl = `${this.serverBaseUrl}/new-quotes`;

  constructor(private http: HttpClient) {}

  getQuote(): Observable<IQuote[]> {
    return this.http.get<IQuote[]>(this.quoteUrl);
  }

  addQuote(quote: IQuote) {
    return this.http.post<IQuote[]>(this.quoteUrl, quote);
  }

  deleteQuote(id: number) {
    return this.http.delete(`${this.quoteUrl}/${id}`);
  }
}
