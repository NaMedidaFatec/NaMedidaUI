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
      // const user = await UserService.signin(user);
      user = new User({
        id: 1,
        username: "Usuário 1",
        email: "email@email.com.br",
        isAdmin: false,
      });
      
      localStorage.setItem("@namedida:user", JSON.stringify(user));
      setState({ isLoggedIn: true, user });
      notifications.show({ title: 'Login', message: "Login realizado com sucesso!" })
    } catch (error) {
      console.log(error);
    }
  };

  const signout = async (): Promise<void> => {
    try {
      localStorage.removeItem("@namedida:user");
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
