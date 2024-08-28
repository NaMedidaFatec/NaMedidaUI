class User {
  id: number;
  username?: string;
  email: string;
  password: string;
  isAdmin: boolean;


  constructor({ id = null, username = '', email = '', password = '', isAdmin = false } = {}) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}

export { User };
