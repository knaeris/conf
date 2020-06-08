import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PersonData} from '../../model/person-data';
import {NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-person-data-input-form',
  templateUrl: './person-data-input-form.component.html',
  styleUrls: ['./person-data-input-form.component.css']
})
export class PersonDataInputFormComponent implements OnInit {

  personDataForm: FormGroup;
  @Output() changedValue = new EventEmitter<{ personData: PersonData }>();

  constructor(private formBuilder: FormBuilder, private ngbDateParserFormatter: NgbDateParserFormatter, private calendar: NgbCalendar) {
    this.personDataForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      dateOfBirth: calendar.getToday()
    });
  }

  ngOnInit(): void {
    this.onChange();
  }

  onChange() {
    this.personDataForm.valueChanges.subscribe(val => {
      const personData: PersonData = new PersonData(this.value('firstName'), this.value('lastName'), this.ngbDateParserFormatter.format(this.value('dateOfBirth')));
      this.changedValue.emit({personData});
    });
  }

  value(field: string): any {
    return this.personDataForm.controls[field].value;
  }
}
