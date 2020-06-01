import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {

  @Input() formName: string;
  @Input() type: string;
  @Input() formGroup: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
