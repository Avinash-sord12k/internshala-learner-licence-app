export type User = {
  id: string,
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