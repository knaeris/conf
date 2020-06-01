import { Component, OnInit } from '@angular/core';
import {InputFieldComponent} from '../input-field/input-field.component';

@Component({
  selector: 'app-input-datepicker',
  templateUrl: './input-datepicker.component.html',
  styleUrls: ['./input-datepicker.component.css']
})
export class InputDatepickerComponent extends InputFieldComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
