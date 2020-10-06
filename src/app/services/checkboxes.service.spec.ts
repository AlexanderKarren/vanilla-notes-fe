import { TestBed } from '@angular/core/testing';

import { CheckboxesService } from './checkboxes.service';

describe('CheckboxesService', () => {
  let service: CheckboxesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckboxesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
