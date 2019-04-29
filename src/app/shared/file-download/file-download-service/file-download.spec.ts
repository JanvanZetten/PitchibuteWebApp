import { TestBed } from '@angular/core/testing';

import { FileDownloadService } from './file-download.service';

describe('FileDownloadServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileDownloadService = TestBed.get(FileDownloadService);
    expect(service).toBeTruthy();
  });
});
