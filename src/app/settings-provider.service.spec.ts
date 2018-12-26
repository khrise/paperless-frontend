import { TestBed } from '@angular/core/testing';

import { SettingsProviderService } from './settings-provider.service';

describe('SettingsProiderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingsProviderService = TestBed.get(SettingsProviderService);
    expect(service).toBeTruthy();
  });
});
