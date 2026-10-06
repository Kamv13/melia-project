import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Leaderboard } from './pages/leaderboard/leaderboard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: 'leaderboard', component: Leaderboard },
  { path: '**', redirectTo: '' },
  
];