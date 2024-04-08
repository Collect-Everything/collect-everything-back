export interface IAuthService {
  login: (credentials: any) => Promise<any>;
  register: (credentials: any) => Promise<any>;
  refreshToken: (refreshToken: string) => Promise<any>;
}
