import { prop, getModelForClass } from "@typegoose/typegoose";

export class User {

  @prop()
  email!: string;

  @prop()
  password!: string;

  @prop()
  firstName?: string;

  @prop()
  lastName?: string;

  @prop()
  address?: string;

  @prop()
  mobileNumber?: string;
}

const UserModel = getModelForClass(User);

export default UserModel;
