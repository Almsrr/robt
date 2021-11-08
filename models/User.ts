export default class User {
  id: string;
  username: string;
  name: string;
  email: string;

  constructor(id: string, username: string, name: string, email: string) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.email = email;
  }
}
