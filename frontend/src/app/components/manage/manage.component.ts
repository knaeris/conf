import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit, OnDestroy {

  isUserLoggedIn: boolean;
  active = 1;
  navigateTimeout;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.isUserLoggedIn = UserService.isUserLoggedIn();
    if (!this.isUserLoggedIn) {
      this.navigateTimeout = setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.navigateTimeout);
  }

}
