import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LabeledFormElementComponent} from './labeled-form-element.component';

describe('LabeledInputComponent', () => {
  let component: LabeledFormElementComponent;
  let fixture: ComponentFixture<LabeledFormElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabeledFormElementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabeledFormElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
