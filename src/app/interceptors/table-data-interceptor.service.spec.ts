import { TestBed } from '@angular/core/testing';

import { TableDataInterceptor } from './table-data.interceptor';

describe('TableDataInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableDataInterceptor = TestBed.get(TableDataInterceptor);
    expect(service).toBeTruthy();
  });
});
