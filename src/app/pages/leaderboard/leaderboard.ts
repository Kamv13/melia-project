import { Component } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { LeaderboardResponse } from '../../models/leaderboard.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css',
})
export class Leaderboard {
  leaderboard = httpResource<LeaderboardResponse>(() => '/api/info/leaderboard');

  hideIcon(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}