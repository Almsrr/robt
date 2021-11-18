export default class User {
  id: string;
  firstName?: string;
  lastName?: string;
  account: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    account: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.account = account;
  }
}
