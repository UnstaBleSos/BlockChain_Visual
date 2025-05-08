import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ec as EC} from 'elliptic'
import { BlockchainService } from '../../services/blockchain-service.service';
import { WalletServiceService } from '../../services/wallet-service.service';

@Component({
  selector: 'app-transaction',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent {

  constructor(public  blockchainService: BlockchainService, private walletService:WalletServiceService ){}

  ngOnInit() {
    const keys = this.walletService.getKeys();
    if (keys.publicKey && keys.privateKey) {
      this.transactions.patchValue({
        publicKey: keys.publicKey,
        privateKey: keys.privateKey
      });
    }
  }
  
 



  transactions = new FormGroup({
    publicKey: new FormControl(''),
    privateKey: new FormControl(''),
    amount : new FormControl(''),
    toAddress: new FormControl('')
  })

  sendTransaction(){
    
    const keys = this.walletService.getKeys()
    console.log("Public Key from transactonn",keys.publicKey)
    console.log("Private Key from transactonn",keys.privateKey)
    
    

    
    const privateKey = this.transactions.value.privateKey
    const publicKey = this.transactions.value.publicKey
    const toAddress = this.transactions.value.toAddress
    const amount = this.transactions.value.amount

    console.log(privateKey)
    console.log(publicKey)
    console.log(toAddress)
    console.log(amount)

   if(!privateKey || !publicKey || !amount){
    console.error("Missing Required Fields")
   }

   try{
    const ec = new EC('secp256k1')
    const key = ec.keyFromPrivate(privateKey as string)
     const transaction ={
       fromAddress: publicKey,
       toAddress:toAddress,
       amount:amount
     }
     const tx = key.sign(JSON.stringify(transaction),'hex')

     console.log(publicKey)
     console.log(privateKey)
     console.log(amount)
     console.log(key)
     console.log(tx)

    //  this.blockchainService.addTransactionAndCreateBlock({
    //   transaction:transaction,
    //   signature: tx.toDER('hex')
    //  })

     this.blockchainService.addPendingTransaction({
      transaction:transaction,
      signature: tx.toDER('hex')
     })

  //  const index = this.blockchainService.blockchain.length-1
  //  const previousHash = this.blockchainService.blockchain[index].hash
  //  const transactions= this.blockchainService.currentBlock.transactions
  //  const hash = this.blockchainService.calculateBlockHash(index,previousHash,Date.now(),0,transactions)

  //  console.log("Transaction Signed and Added to Blockchain:");
  //   console.log(transaction);
  //   console.log(tx);
  //   console.log(hash, "HELLO")
  //    console.log("Previous Hash   ",previousHash)


     this.transactions.reset()

   }catch(err){
    console.log(err)
   }
   
  }
}
