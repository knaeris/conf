import { Component, OnInit } from '@angular/core';
import {PersonData} from "../../model/person-data";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {SignUpRequest} from "../../model/sign-up-request";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  personData: PersonData;
  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmedPassword: ['', [
        Validators.required,
        SignUpComponent.matchValues('password'),
      ]]
    })
  }

  ngOnInit(): void {
    this.signUpForm.controls.password.valueChanges.subscribe(() => {
      this.signUpForm.controls.confirmedPassword.updateValueAndValidity();
    });
  }

  signUp(): void {
    const signUpRequest:SignUpRequest = new SignUpRequest();
    signUpRequest.username = this.value('username');
    signUpRequest.password = this.value('password');
    signUpRequest.personData = this.personData;
    console.log(signUpRequest);
    this.userService.signUp(signUpRequest)
  }

  getPersonData(value: any): void {
    this.personData = value as PersonData;
  }

  value(field: string): any {
    return this.signUpForm.controls[field].value;
  }

  public static matchValues(matchTo: string): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.controls[matchTo].value
        ? null
        : {isMatching: false};
    };
  }
}
