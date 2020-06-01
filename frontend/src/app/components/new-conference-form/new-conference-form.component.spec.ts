import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConferenceFormComponent } from './new-conference-form.component';

describe('NewconferenceformComponent', () => {
  let component: NewConferenceFormComponent;
  let fixture: ComponentFixture<NewConferenceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConferenceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConferenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
