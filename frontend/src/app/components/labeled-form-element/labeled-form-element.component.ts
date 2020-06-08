import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-labeled-form-element',
  templateUrl: './labeled-form-element.component.html',
  styleUrls: ['./labeled-form-element.component.css']
})
export class LabeledFormElementComponent implements OnInit {

  @Input() formElementName: string;
  @Input() type: string;
  @Input() labelText: string;
  @Input() formGroup: FormGroup;
  @Input() isDatePicker: boolean;
  @Input() isTimePicker: boolean;
  @Input() isRegularTextInput: boolean;
  @Input() isSelect: boolean;
  @Input() iterables: any[];
  @Input() formElementClass: string;
  @Input() formElementTitle: string;
  @Input() minimumLength: string;
  constructor() {
  }

  ngOnInit(): void {
  }

}
