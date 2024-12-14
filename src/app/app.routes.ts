import { Routes } from '@angular/router';
import { StatsComponent } from './components/stats/stats.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: '', redirectTo: 'stats', pathMatch: 'full'},
    {path: 'stats', component: StatsComponent},
    {path: 'wallet', component: WalletComponent},
    {path: '**', component: PageNotFoundComponent}
];
