import { BaseService } from './baseService';

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = LoginData & {
  firstname: string;
  lastname: string;
};

export type LoginResponse = {
  token: string;
};

export type UserData = RegisterData;

class AuthService extends BaseService {
  constructor() {
    super();

    this.baseEndpoint = '/auth';
  }

  login(data: LoginData) {
    return this.doPost<LoginResponse>('/login', data);
  }

  signup(data: RegisterData) {
    return this.doPost<UserData>('/register', data);
  }

  userInfo(accessToken: string) {
    this.httpClient.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
    return this.httpClient.get<UserData>('/auth/admin/user');
  }
}

const AuthServiceInstanceController = new AuthService();

export { AuthService, AuthServiceInstanceController };
