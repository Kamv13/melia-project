import { Component, input } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MonsterInfo } from '../../models/database.model';

@Component({
  selector: 'app-monster-detail',
  imports: [RouterLink],
  templateUrl: './monster-detail.html',
})
export class MonsterDetail {
  id = input.required<string>();
  monster = httpResource<MonsterInfo>(() => `/api/db/monsters/${this.id()}`);

  amount(min: number, max: number) {
    return max > min ? `${min} - ${max}` : `${Math.max(min, 1)}`;
  }
}