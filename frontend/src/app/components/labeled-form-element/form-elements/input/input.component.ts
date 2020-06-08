import {Component, OnInit} from '@angular/core';
import {LabeledFormElementComponent} from "../../labeled-form-element.component";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent extends LabeledFormElementComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
