import { SessionType } from "@/types/Session.types"
import mongoose from "mongoose"


const SessionSchema = new mongoose.Schema<SessionType>(
  {
    // userId: {
    //   type: String,
    //   required: true,
    // },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    jwt: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const SessionModal = mongoose.models?.Sessions || mongoose.model("Sessions", SessionSchema);

export default SessionModal;


