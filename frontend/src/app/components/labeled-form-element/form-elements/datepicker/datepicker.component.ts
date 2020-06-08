import {Component, OnInit} from '@angular/core';
import {LabeledFormElementComponent} from "../../labeled-form-element.component";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent extends LabeledFormElementComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
