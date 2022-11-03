import { createContext, ReactElement, useContext } from 'react';

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ISignupInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export type User = ILoginInput & ISignupInput;

interface IAuthContextProps {
  login: (data: ILoginInput) => User | null;
  signup: (data: ISignupInput) => User | null;
  getCurrentUser: () => User | null;
}

interface IAuthContextProviderProps {
  children?: ReactElement;
}

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

const AuthProvider = ({ children }: IAuthContextProviderProps) => {
  const getUsers = (): Array<any> | null => {
    const rawUsers = localStorage.getItem('users');
    if (!rawUsers) return null;

    const users = JSON.parse(rawUsers);
    if (!Array.isArray(users)) return null;

    return users;
  };

  const getCurrentUser = (): User | null => {
    const rawUser = localStorage.getItem('current_user');
    if (!rawUser) return null;

    return JSON.parse(rawUser);
  };

  const saveCurrentUser = (data: User) => {
    localStorage.setItem('current_user', JSON.stringify(data));
  };

  const login = (data: ILoginInput): User | null => {
    const users = getUsers();
    if (!users) return null;

    const user = users.find((u) => data.email === u.email && data.password === u.password);
    if (!user) return null;

    saveCurrentUser(user);
    return user;
  };

  const signup = (data: ISignupInput): User | null => {
    const users = getUsers();
    if (users) {
      const userExists = users.find((u) => u.email === data.email);
      if (userExists) {
        throw new Error('A user with the same email already exists');
      }
    }

    const rawUsers = [data];
    const jsonUsers = JSON.stringify(rawUsers);
    saveCurrentUser(data);
    localStorage.setItem('users', jsonUsers);
    return data;
  };

  const value = {
    login,
    signup,
    getCurrentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuthContext };
