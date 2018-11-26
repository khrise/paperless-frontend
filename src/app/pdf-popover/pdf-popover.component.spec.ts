import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfPopoverComponent } from './pdf-popover.component';

describe('PdfPopoverComponent', () => {
  let component: PdfPopoverComponent;
  let fixture: ComponentFixture<PdfPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
