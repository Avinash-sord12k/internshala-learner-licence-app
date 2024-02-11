export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type User = {
  id: string,
  role: UserRole,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  address: string,
  mobileNumber: string,
  createdAt: Date,
  updatedAt: Date,
}


export type UserInput = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  address: string,
  mobileNumber: string,
}