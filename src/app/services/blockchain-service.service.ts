import { Injectable } from '@angular/core';
import SHA256 from "crypto-js/sha256"
@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  public blockchain: any[];
  public currentBlock: any;

  constructor() {
   
    this.blockchain = [];
    this.createBlock(0, "0");  

    this.addTransaction({
      transaction:{
        fromAddress:'genesis',
        toAddress:'network',
        amount:100
      },
      signature:'Genesis Signature',
      hash:this.calculateBlockHash(0,"genesisBlock",Date.now())
    })

  }

  createBlock(index: number, previousHash: string) {
    const block = {
      index: index,
      timestamp: Date.now(),
      transactions: [],
      previousHash: previousHash,
      hash: this.calculateBlockHash(index, previousHash, Date.now())
    };

    this.blockchain.push(block);
    this.currentBlock = block;
  }

  addTransaction(transaction: any) {
    this.currentBlock.transactions.push(transaction);
  }

  calculateBlockHash(index: number, previousHash: string, timestamp: number) {
    return SHA256(index+previousHash+timestamp).toString()
    // return `${index}${previousHash}${timestamp}`; 
  }
  
  getChain() {
    return this.blockchain;
  }

  addTransactionAndCreateBlock(transaction: any) {
    this.createBlock(this.blockchain.length, this.currentBlock.hash);
    this.addTransaction(transaction);  
  }
}
