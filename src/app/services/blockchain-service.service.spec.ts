import { TestBed } from '@angular/core/testing';

import { BlockchainServiceService } from './blockchain-service.service';

describe('BlockchainServiceService', () => {
  let service: BlockchainServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockchainServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
