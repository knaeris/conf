import {Component, OnInit} from '@angular/core';
import {Person} from '../../model/person';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  person: Person;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userService.userLoggedIn.subscribe(value => {
      if (value) {
        this.router.navigate(['/manage']);
      }
    });
  }

  login(): void {
    this.userService.logIn(this.person);
  }

  getPerson(value: any): void {
    this.person = value as Person;
  }

}
