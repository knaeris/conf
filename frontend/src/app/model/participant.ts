import {PersonData} from './person-data';

export class Participant {
  personData: PersonData;

  constructor(personData: PersonData) {
    this.personData = personData;
  }
}
