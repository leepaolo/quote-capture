import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { InputTextComponent } from '../../parts/input-text.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CreateQuoteService } from '../../../service/create-quote.service';
import { IQuote } from '../../../models/quote.interface';

@Component({
  selector: 'app-create-new-quote-bar',
  standalone: true,
  imports: [CommonModule, InputTextComponent, ReactiveFormsModule],
  templateUrl: './create-new-quote-bar.component.html',
  styleUrls: ['./create-new-quote-bar.component.css'], // Corrected 'styleUrls'
})
export class CreateNewQuoteBarComponent implements OnInit, OnDestroy {
  quoteText: string = 'Enter your quote';
  authorText: string = 'Add the Author';
  buttonText: string = 'Save';

  private destroy$ = new Subscription();

  createQuoteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private createQuoteService: CreateQuoteService
  ) {}

  ngOnInit(): void {
    this.createQuoteForm = this.fb.group({
      quoteText: ['', Validators.required],
      authorText: [''],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    if (this.createQuoteForm.valid) {
      const quoteText = this.createQuoteForm.get('quoteText')?.value;
      let authorText = this.createQuoteForm.get('authorText')?.value;
      const tags = this.createQuoteForm.get('tags')?.value || [];
      const category =
        this.createQuoteForm.get('category')?.value || 'Uncategorized';

      // Set default author as "Anonymous" if authorText is empty
      if (!authorText || authorText.trim() === '') {
        authorText = 'Anonymous';
      }

      // Construct the IQuote object
      const newQuote: IQuote = {
        quote: quoteText,
        author: authorText,
        length: quoteText.length.toString(),
        tags: tags,
        category: category,
        id: Math.random().toString(36).substr(2, 9),
      };

      // Call the service to add the new quote
      this.createQuoteService.addQuote(newQuote).subscribe({
        next: (response) => {
          console.log('Quote added successfully:', response);
          // Optionally, reset the form
          this.createQuoteForm.reset({
            quoteText: '',
            authorText: '',
            tags: [],
            category: '',
          });
        },
        error: (error) => {
          console.error('Error adding quote:', error);
          // Optionally, display an error message to the user
        },
      });
    } else {
      // Handle invalid form state
      console.error('Form is invalid');
      // Optionally, display validation errors to the user
    }
  }
}
