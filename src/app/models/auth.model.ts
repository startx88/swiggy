enum IRole {
  admin = 'admin',
  partner = 'partner',
  user = 'user',
  chef = 'chef',
}

interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile: string;
  verify: boolean;
  active: boolean;
  role: IRole;
  token: string;
  refereshToken: string;
  insertAt: Date;
}

interface IAuthResponse {
  message: string;
  token: string;
  data: any;
  expireIn: number;
}

interface IAuthentication {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  mobile?: string;
}

// export
export { IRole, IUser, IAuthResponse, IAuthentication };
