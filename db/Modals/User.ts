import { prop, getModelForClass } from "@typegoose/typegoose";

export class User {

  @prop({ required: true, unique: true })
  email!: string;

  @prop({ required: true })
  password!: string;

  @prop({ required: true, unique: true })
  firstName?: string;

  @prop()
  lastName?: string;

  @prop()
  address?: string;

  @prop({ required: true })
  mobileNumber?: string;
}

const UserModel = getModelForClass(User);

export default UserModel;
