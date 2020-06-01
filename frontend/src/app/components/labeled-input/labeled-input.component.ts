import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-labeled-input',
  templateUrl: './labeled-input.component.html',
  styleUrls: ['./labeled-input.component.css']
})
export class LabeledInputComponent implements OnInit {

  @Input() formName: string;
  @Input() type: string;
  @Input() labelText: string;
  @Input() formGroup: FormGroup;
  @Input() isDatePicker: boolean;
  @Input() isTimePicker: boolean;
  @Input() isRegularTextInput: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
