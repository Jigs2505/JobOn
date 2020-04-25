import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingtestComponent } from './codingtest.component';

describe('CodingtestComponent', () => {
  let component: CodingtestComponent;
  let fixture: ComponentFixture<CodingtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodingtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
