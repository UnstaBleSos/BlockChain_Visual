import { Component } from '@angular/core';
import { WalletServiceService } from '../../services/wallet-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-wallet',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})
export class WalletComponent {
  public     privateKey:string |null = null
  public     publicKey:string |null = null


  constructor(private walletService:WalletServiceService){}

 callKeys(){
  const keys= this.walletService.generateKeys()
  this.publicKey = keys.publicKey
  this.privateKey = keys.privateKey
 
 }

}
