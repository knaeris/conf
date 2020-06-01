import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Person} from '../../model/person';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-person-data-input-form',
  templateUrl: './person-data-input-form.component.html',
  styleUrls: ['./person-data-input-form.component.css']
})
export class PersonDataInputFormComponent implements OnInit {

  personDataForm: FormGroup;
  @Output() changedValue = new EventEmitter<{person: Person}>();

  constructor(private formBuilder: FormBuilder, private ngbDateParserFormatter: NgbDateParserFormatter) {
    this.personDataForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      dateOfBirth: [this.todayDate()]
    });
  }

  ngOnInit(): void {
    this.onChange();
  }

  onChange() {
    this.personDataForm.valueChanges.subscribe( val => {
      const person: Person = new Person(this.value('firstName'),  this.value('lastName'), this.ngbDateParserFormatter.format(this.value('dateOfBirth')));
      this.changedValue.emit({person});
    });
  }

  todayDate(): object {
    const now: Date = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDay()
    };
  }

  value(field: string): any {
    return this.personDataForm.controls[field].value;
  }
}
