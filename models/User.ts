export default class User {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    role: string,
    email: string,
    password: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.email = email;
    this.password = password;
  }
}
