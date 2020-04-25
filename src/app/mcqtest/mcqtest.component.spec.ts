import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MCQTestComponent } from './mcqtest.component';

describe('MCQTestComponent', () => {
  let component: MCQTestComponent;
  let fixture: ComponentFixture<MCQTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MCQTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MCQTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
