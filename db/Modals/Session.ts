import { getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./User";
import mongoose from "mongoose";

class Session {
  @prop({ ref: () => User, required: true })
  public userId!: string;

  @prop({ required: true })
  public jwt!: string;

  @prop({ required: true })
  public expiresAt!: Date;
}

const SessionModel = mongoose.models?.Session || getModelForClass(Session);

export default SessionModel;
