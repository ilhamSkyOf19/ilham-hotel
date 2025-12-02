import { model, Schema } from "mongoose";
import { IUser } from "../models/user-model";
import bcrypt from "bcrypt";

// user schema
const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "default.png",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    activateCode: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// model
const UserModel = model<IUser>("User", UserSchema);

// hash password
UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

// export
export default UserModel;
