import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovableBackgroundComponent } from './movable-background.component';

describe('MovableBackgroundComponent', () => {
  let component: MovableBackgroundComponent;
  let fixture: ComponentFixture<MovableBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovableBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovableBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
