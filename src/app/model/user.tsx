class User {
  id: number;
  username?: string;
  email: string;
  password: string;

  constructor({ id = null, username = '', email = '', password = '' } = {}) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

export { User };
