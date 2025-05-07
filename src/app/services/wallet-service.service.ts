import { Injectable } from '@angular/core';
import {ec as EC} from 'elliptic'
@Injectable({
  providedIn: 'root'
})
export class WalletServiceService {

  constructor() { 
    
  }

  generateKeys(){
    const ec = new EC('secp256k1')
    const key = ec.genKeyPair()
    const publicKey = key.getPublic('hex')
    const privateKey = key.getPrivate('hex')

    return {publicKey,privateKey}

  }
}
