import { Component, computed, input, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { DatabaseType, SearchResult } from '../../models/database.model';

@Component({
  selector: 'app-database-search',
  imports: [RouterLink],
  templateUrl: './database-search.html',
})
export class DatabaseSearch {
  type = input.required<DatabaseType>();
  query = signal('');

  results = httpResource<SearchResult[]>(
    () => `/api/db/${this.type()}?search=${encodeURIComponent(this.query())}`
  );

  title = computed(() => this.type().charAt(0).toUpperCase() + this.type().slice(1));

  search(event: Event, value: string) {
    event.preventDefault();
    this.query.set(value.trim());
  }
}