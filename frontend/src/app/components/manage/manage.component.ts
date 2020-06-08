import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit, OnDestroy {

  active = 1;
  redirectTimeout;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    clearTimeout(this.redirectTimeout);
  }

  isUserSignedIn(): boolean {
    return this.userService.isUserSignedIn();
  }

}
