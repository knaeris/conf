import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  active = 0;

  constructor(private userService: UserService, private router: Router) {
  }

  signOut(): void {
    this.userService.signOut();
  }

  isUserSignedIn(): boolean {
    return this.userService.isUserSignedIn();
  }

  ngOnInit(): void {
    this.router.events.subscribe(v => {
      const route: string = this.router.url;
      if (route === '/login') {
        this.active = 3;
      } else if (route === '/manage') {
        this.active = 2;
      } else if (route === '/new-conference'){
        this.active = 1;
      } else {
        this.active = 0;
      }
    });
  }
}
