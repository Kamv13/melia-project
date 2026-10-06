import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Leaderboard } from './pages/leaderboard/leaderboard';
import { Database } from './pages/database/database';
import { DatabaseSearch } from './pages/database-search/database-search';
import { ItemDetail } from './pages/item-detail/item-detail';
import { MonsterDetail } from './pages/monster-detail/monster-detail';
import { MapDetail } from './pages/map-detail/map-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: 'leaderboard', component: Leaderboard },
  { path: 'database', component: Database },
  { path: 'database/items/:id', component: ItemDetail },
  { path: 'database/monsters/:id', component: MonsterDetail },
  { path: 'database/maps/:id', component: MapDetail },
  { path: 'database/recipes/:id', component: ItemDetail },
  { path: 'database/:type', component: DatabaseSearch },
  { path: '**', redirectTo: '' },
];