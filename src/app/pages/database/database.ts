import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-database',
  imports: [RouterLink],
  templateUrl: './database.html',
})
export class Database {
  sections = [
    { type: 'items', title: 'Items', description: 'Equipment, consumables and materials' },
    { type: 'recipes', title: 'Recipes', description: 'item and requirements.' },
    { type: 'monsters', title: 'Monsters', description: 'EXP, silver and item drops.' },
    { type: 'maps', title: 'Maps', description: 'monsters spawn.' },
  ];
}