import {User} from './user';
import {PersonData} from "./person-data";

export class Host {

  personData: PersonData;

  constructor(personData: PersonData) {
    this.personData = personData;
  }
}
