import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDataInputFormComponent } from './person-data-input-form.component';

describe('PersonDataInputFormComponent', () => {
  let component: PersonDataInputFormComponent;
  let fixture: ComponentFixture<PersonDataInputFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonDataInputFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDataInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
