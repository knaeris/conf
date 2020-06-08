import {Component, OnInit} from '@angular/core';
import {LabeledFormElementComponent} from "../../labeled-form-element.component";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent extends LabeledFormElementComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
