class User {
  id?: number;
  username?: string;
  email: string;
  password: string;
  tipoUsuario: string;
  isAdmin?: boolean;
  departamento?: any;

  constructor({ id = null, username = '', email = '', password = '', isAdmin = false, tipoUsuario = '', departamento = {} } = {}) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.tipoUsuario = tipoUsuario;
    this.isAdmin = isAdmin;
    this.departamento = departamento;
  }
}

export { User };
