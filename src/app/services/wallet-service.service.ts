import { Injectable } from '@angular/core';
import {ec as EC} from 'elliptic'
@Injectable({
  providedIn: 'root'
})
export class WalletServiceService {

  publicKey : string = ''
  privateKey : string = ''

  constructor() { 
    
  }

  generateKeys(){
    const ec = new EC('secp256k1')
    const key = ec.genKeyPair()
    this.publicKey = key.getPublic('hex')
    this.privateKey = key.getPrivate('hex')

    return {publicKey: this.publicKey,privateKey:this.privateKey}

  }

  getKeys(){
    return{publicKey: this.publicKey,privateKey:this.privateKey}
  }

}
