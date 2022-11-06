import { createContext, ReactElement, useContext } from 'react';
import {
  AuthServiceInstanceController,
  LoginData,
  RegisterData,
  UserData
} from '../../services/authService';

interface IAuthContextProps {
  login: (data: LoginData) => Promise<UserData | null>;
  signup: (data: RegisterData) => Promise<UserData | null>;
  getCurrentUser: () => UserData | null;
  logout: () => void;
}

interface IAuthContextProviderProps {
  children?: ReactElement;
}

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

const AuthProvider = ({ children }: IAuthContextProviderProps) => {
  const logout = () => {
    localStorage.removeItem('hellobuild_current_user');
    localStorage.removeItem('hellobuild_access_token');
  };

  const getCurrentUser = (): UserData | null => {
    const rawUser = localStorage.getItem('hellobuild_current_user');
    if (!rawUser) return null;

    return JSON.parse(rawUser);
  };

  const login = async (data: LoginData): Promise<UserData | null> => {
    try {
      const res = await AuthServiceInstanceController.login(data);
      localStorage.setItem('hellobuild_access_token', res.data.token);

      const userData = await AuthServiceInstanceController.userInfo(res.data.token);
      localStorage.setItem('hellobuild_current_user', JSON.stringify(userData.data));
      return userData.data;
    } catch (e) {
      return null;
    }
  };

  const signup = async (data: RegisterData): Promise<UserData | null> => {
    try {
      const res = await AuthServiceInstanceController.signup(data);
      localStorage.setItem('hellobuild_current_user', JSON.stringify(res.data));
      return res.data;
    } catch (e) {
      throw new Error((e as any)?.response?.data?.error || 'Unexpected error');
    }
  };

  const value = {
    login,
    signup,
    logout,
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
