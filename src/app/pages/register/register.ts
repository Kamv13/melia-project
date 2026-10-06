import { Component, inject, signal } from '@angular/core';
import { form, FormField, required, minLength } from '@angular/forms/signals';
import { AccountService } from '../../services/account.services';
import { RegisterModel } from '../../models/account.model';

@Component({
  selector: 'app-register',
  imports: [FormField],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private accountService = inject(AccountService);

  model = signal<RegisterModel>({ username: '', password: '', confirm: '' });

  registerForm = form(this.model, (f) => {
    required(f.username);
    minLength(f.username, 4);
    required(f.password);
    minLength(f.password, 6);
    required(f.confirm);
  });

  message = signal('');
  success = signal(false);
  loading = signal(false);

  submit(event: Event) {
    event.preventDefault();
    this.registerForm().markAsTouched();

    if (this.registerForm().invalid()) {
      return;
    }

    if (this.model().password !== this.model().confirm) {
      this.success.set(false);
      this.message.set('Passwords do not match.');
      return;
    }

    this.loading.set(true);
    this.message.set('');

    this.accountService.register(this.model()).subscribe({
      next: () => {
        this.success.set(true);
        this.message.set('Account created Successfully.');
        this.model.set({ username: '', password: '', confirm: '' });
        this.registerForm().reset();
        this.loading.set(false);
      },
      error: (err) => {
        this.success.set(false);
        this.message.set(err.error?.error ?? 'Account Service is not available. Please try again later.');
        this.loading.set(false);
      },
    });
  }
}