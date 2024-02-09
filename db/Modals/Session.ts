import { getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./User";

class Session {
  @prop({ ref: () => User, required: true })
  public userId!: string;

  @prop({ required: true })
  public jwt!: string;

  @prop({ required: true })
  public expiresAt!: Date;
}

const SessionModel = getModelForClass(Session);

export default SessionModel;
