"use client";
import { createContext, useContext, useState, useEffect } from "react";
import UserService from "../../services/user";
import { User } from "../../model/user";
import { notifications } from '@mantine/notifications';

interface AuthState {
  isLoggedIn: boolean;
  user?: User;
  signin?: (user: User) => Promise<void>;
  signout?: () => void;
}

const AuthContext = createContext<AuthState>({ isLoggedIn: false });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState<AuthState>({ isLoggedIn: false });

  useEffect(() => {
    const user: User = JSON.parse(localStorage.getItem("@namedida:user"));
    if (user) {
      setState({ isLoggedIn: true, user: new User(user) });
    }
  }, []);

  const signin = async (user: User): Promise<void> => {
    try {
      const accessToken = await UserService.signin(user);
      if (accessToken) {
        await localStorage.setItem("@namedida:accessToken", accessToken);

        const { userDepartamento, userUnidadeEnsino } = await UserService.getMe();
        
        if (user.tipoUsuario == "DEPARTAMENTO") {
          localStorage.setItem("@namedida:user", JSON.stringify(userDepartamento));
        } else {
          localStorage.setItem("@namedida:user", JSON.stringify(userUnidadeEnsino));
        }

        localStorage.setItem("@namedida:user", JSON.stringify(user));
        setState({ isLoggedIn: true, user });
        notifications.show({ title: 'Login', message: "Login realizado com sucesso!", position: 'bottom-left' })
      }
    } catch (error) {
      console.log(error);
      notifications.show({ title: 'Erro no login!', message: error?.message, position: 'bottom-left', color: 'red' })
    }
  };

  const signout = async (): Promise<void> => {
    try {
      localStorage.removeItem("@namedida:user");
      localStorage.removeItem("@namedida:accessToken");
      setState({ isLoggedIn: false })
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <AuthContext.Provider value={{ ...state, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
