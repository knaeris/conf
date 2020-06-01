import {User} from './user';

export class Host {
  user: User;

  constructor(user: User) {
    this.user = user;
  }
}
