import { Component } from '@angular/core';
import { BlockchainService } from '../../services/blockchain-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mining',
  imports: [CommonModule],
  templateUrl: './mining.component.html',
  styleUrl: './mining.component.scss'
})
export class MiningComponent {
  
  public block: any = []
  public transactionInfo : any =[]  

  constructor(public  blockchainService: BlockchainService){}

  
   
  addTransactionAndCreateBlock(transaction: any) {
    const newBlock = this.blockchainService.createBlock(this.blockchainService.blockchain.length, this.blockchainService.currentBlock.hash);
    this.blockchainService.currentBlock = newBlock;
    this.block=newBlock
    this.blockchainService.blockchain.push(newBlock);
    this.blockchainService.pendingTransactions=[]
    this.transactionInfo= transaction
    this.blockchainService.addTransaction(transaction);
    
  }

  startMining(){
    
    if(this.blockchainService.pendingTransactions.length >0){
      const transaction= this.blockchainService.pendingTransactions[0]

      this.addTransactionAndCreateBlock(
        transaction
         )
    }

  }
  

}
