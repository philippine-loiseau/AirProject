import {TestBed} from '@angular/core/testing';

import {AirProjectApiService} from './air-project-api.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AirProjectApiService', () => {
  let service: AirProjectApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AirProjectApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
