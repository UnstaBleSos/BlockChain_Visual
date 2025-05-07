import { Routes } from '@angular/router';
import { WalletComponent } from './components/wallet/wallet.component';
import { BlockchainComponent } from './components/blockchain/blockchain.component';
import { MiningComponent } from './components/mining/mining.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
          { path: '', redirectTo: 'blockchain', pathMatch: 'full' }, // Optional default child
          { path: 'wallet', component: WalletComponent },
          { path: 'blockchain', component: BlockchainComponent },
          { path: 'mining', component: MiningComponent },
          { path: 'transaction', component: TransactionComponent },
        ]
    },
    
];
