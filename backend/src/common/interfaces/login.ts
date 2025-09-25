export interface AuthenticatedUser {
  uuid: string;
  username: string;
  email: string;
}

export interface AuthenticatedUserResponse {
  message?: string;
  user: AuthenticatedUser;
}

export interface UserData extends AuthenticatedUser {
  password?: string;
}
