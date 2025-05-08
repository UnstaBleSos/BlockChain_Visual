import { Injectable } from '@angular/core';
import SHA256 from "crypto-js/sha256";

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  public blockchain: any[];
  public currentBlock: any;
  public difficulty: number = 4;
  public pendingTransactions : any=[]

  constructor() {
    this.blockchain = [];
    const genesisBlock = this.createBlock(0, "0");
    this.blockchain.push(genesisBlock);
    this.currentBlock = genesisBlock;
    this.addTransaction({
      transaction: {
        fromAddress: 'genesis',
        toAddress: 'network',
        amount: 100
      },
      signature: 'Genesis Signature',
      hash: this.calculateBlockHash(
        genesisBlock.index,
        genesisBlock.previousHash,
        genesisBlock.timestamp,
        genesisBlock.nonce,
        genesisBlock.transactions
      )
    });
  }

  createBlock(index: number, previousHash: string) {
    const timestamp = Date.now();
    const transactions: any[] = [];
    const nonce = 0;

    let block = {
      index,
      timestamp,
      transactions,
      previousHash,
      nonce,
      hash: this.calculateBlockHash(index, previousHash, timestamp, nonce, transactions)
    };

    this.mineBlock(block);
    return block; 
  }

  mineBlock(block: any) {
    while (block.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0")) {
      block.nonce++;
      block.hash = this.calculateBlockHash(
        block.index,
        block.previousHash,
        block.timestamp,
        block.nonce,
        block.transactions
      );
    }
    console.log("Block Mined", block.hash);
  }

  addTransaction(transaction: any) {
    this.currentBlock.transactions.push(transaction);
   
  }

  calculateBlockHash(index: number, previousHash: string, timestamp: number, nonce: number, transactions: any) {
    return SHA256(index + previousHash + timestamp + nonce + JSON.stringify(transactions)).toString();
  }

  getChain() {
    return this.blockchain;
  }

  
  addPendingTransaction(transaction:any){
    this.pendingTransactions.push(transaction)
  }
}
