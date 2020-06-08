import {Component, OnInit} from '@angular/core';
import {PersonData} from '../../model/person-data';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginRequest} from "../../model/login-request";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  person: PersonData;
  loginForm: FormGroup;
  returnUrl: string;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  ngOnInit(): void {
    this.userService.signOut();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void {
    const loginRequest: LoginRequest = new LoginRequest();
    loginRequest.password = this.value('password');
    loginRequest.username = this.value('username');
    this.userService.signIn(loginRequest).subscribe(
      data => {
        this.router.navigateByUrl(this.returnUrl);
      },
      error => {
        console.log(error);
      });
  }

  value(field: string): any {
    return this.loginForm.controls[field].value;
  }
}
