export default class Account {
  id: string;
  email: string;
  password: string;
  role: string;
  status: number;

  constructor(
    id: string,
    email: string,
    password: string,
    role: string,
    status: number
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
    this.status = status;
  }
}
