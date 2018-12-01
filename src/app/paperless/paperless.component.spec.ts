import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperlessComponent } from './paperless.component';

describe('PaperlessComponent', () => {
  let component: PaperlessComponent;
  let fixture: ComponentFixture<PaperlessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperlessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperlessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
