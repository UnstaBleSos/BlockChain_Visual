import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BlockchainService } from '../../services/blockchain-service.service';

@Component({
  selector: 'app-blockchain',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './blockchain.component.html',
  styleUrl: './blockchain.component.scss'
})
export class BlockchainComponent {

    constructor(public  blockchainService: BlockchainService){}

}
