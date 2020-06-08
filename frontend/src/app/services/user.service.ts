import {BaseService} from './base-service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {PersonData} from '../model/person-data';
import {SignUpRequest} from "../model/sign-up-request";
import {LoginRequest} from "../model/login-request";
import {map} from "rxjs/operators";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  loginHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'noToken': 'true'
    })
  };

  getSignedInUser(): User {
    return JSON.parse(sessionStorage.getItem('userData')) as User;
  }

  isUserSignedIn(): boolean {
    return !!this.getSignedInUser();
  }

  signOut(): void {
    sessionStorage.removeItem('userData');
  }

  signUp(signUpRequest: SignUpRequest) {
    return super.postWithHeaders('auth/signup', signUpRequest, this.loginHeaders).subscribe(response => {
      console.log(response);
    })
  }

  signIn(loginRequest: LoginRequest) {
    return super.postWithHeaders('auth/signin', loginRequest, this.loginHeaders).pipe(map(result => UserService.storeUser(result)));
  }

  private static storeUser(user: User): void {
    sessionStorage.setItem('userData', JSON.stringify(user));
  }
}
