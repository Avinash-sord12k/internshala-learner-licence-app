import { UserRole } from "@/types/User.types";
import { prop, getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";


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

  @prop({ required: true, default: UserRole.USER, enum: UserRole })
  role!: string;
}

const UserModel = mongoose.models?.User || getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
    toObject: {
      virtuals: true,
      getters: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      }
    },
  },
});

export default UserModel;
