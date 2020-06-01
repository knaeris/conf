export class Person {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;


  constructor(firstName: string, lastName: string, dateOfBirth: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
  }
}
