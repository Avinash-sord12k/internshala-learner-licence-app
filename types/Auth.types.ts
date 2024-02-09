import { User } from "./User.types";

export type SignInAPI = {
  isActive: boolean;
}
export type SignOutAPI = {
  isActive: boolean;
}

export type SignInDto = {
  email: string;
  password: string;
}

enum RoleType {
  ADMIN = 'admin',
  USER = 'user'
}

export type SessionUser = {
  id: string;
  isActive: boolean;
  user: User;
  role: RoleType;
}

export type ChangePassword = {
  userId: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type response = {
  ok: boolean;
  message: string;
  error?: string;
}