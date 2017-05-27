/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CoordinatesService } from './coordinates.service';

describe('CoordinatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoordinatesService]
    });
  });

  it('should ...', inject([CoordinatesService], (service: CoordinatesService) => {
    expect(service).toBeTruthy();
  }));
});
