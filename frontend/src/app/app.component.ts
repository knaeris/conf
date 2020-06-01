import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  active = 1;
  isUserLoggedIn: boolean;

  constructor(private userService: UserService, private router: Router) {
  }

  logout(): void {
    this.userService.logOut();
  }

  ngOnInit(): void {
     this.userService.userLoggedIn.subscribe(() => {
       this.isUserLoggedIn = UserService.isUserLoggedIn();
    });
     this.router.events.subscribe( v => {
      const route: string = this.router.url;
      if(route === '/login'){
        this.active = 3;
      } else if(route === '/manage'){
        this.active = 2;
      } else {
        this.active = 1;
      }
    });
  }
}
