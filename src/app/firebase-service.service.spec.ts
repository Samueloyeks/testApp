import { TestBed } from '@angular/core/testing';

import { FirebaseServiceProvider } from './firebase-service.service';

describe('FirebaseServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseServiceProvider = TestBed.get(FirebaseServiceProvider);
    expect(service).toBeTruthy();
  });
});
 