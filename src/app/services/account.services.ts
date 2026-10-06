import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, RegisterModel } from '../models/account.model';
import { meliaHash } from '../utils/melia-hash';

@Service()
export class AccountService {
  private http = inject(HttpClient);

  register(data: RegisterModel) {
    return this.http.post<ApiResponse>('/api/account/create', {
      username: data.username,
      password1: meliaHash(data.password),
      password2: meliaHash(data.confirm),
    });
  }
}