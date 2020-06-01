import {BaseService} from './base-service';
import {Host} from '../model/host';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {Person} from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  userLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(this.loggedInUser);

  set loggedInUser(value) {
    sessionStorage.setItem('userData', value);
    this.userLoggedIn.next(true);
    console.log('edastan ' + true);
  }

  static get loggedInUser(){
    return sessionStorage.getItem('userData');
  }

  static getLoggedInUser(): User {
   return JSON.parse(this.loggedInUser) as User;
  }

  static isUserLoggedIn(): boolean{
    return this.getLoggedInUser() ? true : false;
  }

  logOut(): void{
    sessionStorage.removeItem('userData');
    this.userLoggedIn.next(false);
  }

  logIn(person: Person): Subscription {
    const user: User = new User(person);
    return super.post('users', user).subscribe(response => {
      if (response) {
        this.loggedInUser = JSON.stringify(response);
      }
    });
  }
}
