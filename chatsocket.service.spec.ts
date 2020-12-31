import { TestBed } from '@angular/core/testing';

import { ChatSocketService } from './chatsocket.service';

describe('ChatSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatSocketService = TestBed.get(ChatSocketService);
    expect(service).toBeTruthy();
  });
});
