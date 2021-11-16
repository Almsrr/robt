export default class Account {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;

  constructor(
    firstName: string,
    lastName: string,
    role: string,
    email: string,
    password: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.email = email;
    this.password = password;
  }
}
