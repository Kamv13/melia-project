import { Component, input } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ItemInfo } from '../../models/database.model';

@Component({
  selector: 'app-item-detail',
  imports: [RouterLink],
  templateUrl: './item-detail.html',
})
export class ItemDetail {
  id = input.required<string>();
  item = httpResource<ItemInfo>(() => `/api/db/items/${this.id()}`);
}