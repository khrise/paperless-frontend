import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawTextComponent } from './raw-text.component';

describe('RawTextComponent', () => {
  let component: RawTextComponent;
  let fixture: ComponentFixture<RawTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
