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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createQuoteForm = this.fb.group({
      quoteText: ['', Validators.required],
      authorText: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    if (this.createQuoteForm.valid) {
      const quote = this.createQuoteForm.get('quoteText')?.value;
      const author = this.createQuoteForm.get('authorText')?.value;
      console.log('Form submitted:', { quote, author });
      // You can handle form submission here, e.g., send data to a service
    } else {
      // Handle invalid form state
      console.error('Form is invalid');
    }
  }
}
