class User {
  id?: number;
  username?: string;
  email: string;
  password: string;
  nome: string;
  tipoUsuario: string;
  isAdmin?: boolean;
  departamento?: any;

  constructor({ id = null, username = '', email = '', password = '', isAdmin = false, tipoUsuario = '', departamento = {}, nome = '' } = {}) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.tipoUsuario = tipoUsuario;
    this.isAdmin = isAdmin;
    this.departamento = departamento;
    this.nome = nome;
  }
}

export { User };
