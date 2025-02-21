import { TestBed } from '@angular/core/testing';

import { AutocompleteSearchbarService } from './autocomplete-searchbar.service';

describe('AutocompleteSearchbarService', () => {
  let service: AutocompleteSearchbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutocompleteSearchbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
