import { Component, input } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MapInfo } from '../../models/database.model';

@Component({
  selector: 'app-map-detail',
  imports: [RouterLink],
  templateUrl: './map-detail.html',
})
export class MapDetail {
  id = input.required<string>();
  map = httpResource<MapInfo>(() => `/api/db/maps/${this.id()}`);
}