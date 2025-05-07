import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ec as EC} from 'elliptic'
import { BlockchainService } from '../../services/blockchain-service.service';
@Component({
  selector: 'app-transaction',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent {

  constructor(public  blockchainService: BlockchainService){}

  transactions = new FormGroup({
    publicKey: new FormControl(''),
    privateKey: new FormControl(''),
    amount : new FormControl('')
  })

  sendTransaction(){
   const privateKey = this.transactions.value.privateKey
   const publicKey = this.transactions.value.publicKey
   const amount = this.transactions.value.amount
   
   if(!privateKey || !publicKey || !amount){
    console.error("Missing Required Fields")
   }

   try{
    const ec = new EC('secp256k1')
    const key = ec.keyFromPrivate(privateKey as string)
     const transaction ={
       fromAddress: publicKey,
       toAddress:'public key yeta halne',
       amount:amount
     }
     const tx = key.sign(JSON.stringify(transaction),'hex')

     console.log(publicKey)
     console.log(privateKey)
     console.log(amount)
     console.log(key)
     console.log(tx)

     this.blockchainService.addTransactionAndCreateBlock({
      transaction:transaction,
      signature: tx.toDER('hex')
     })

   const index = this.blockchainService.blockchain.length-1
   const previousHash = this.blockchainService.blockchain[index].hash
   const hash = this.blockchainService.calculateBlockHash(index,previousHash,Date.now())

   console.log("Transaction Signed and Added to Blockchain:");
    console.log(transaction);
    console.log(tx);
    console.log(hash, "HELLO")


   }catch(err){
    console.log(err)
   }
   
  }
}
