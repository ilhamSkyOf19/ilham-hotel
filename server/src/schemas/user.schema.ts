import { model, Schema } from "mongoose";
import { IUser } from "../models/user-model";
import bcrypt from "bcrypt";
import { renderEmail, sendEmail } from "../utils/mail/mail";
import { generateCode } from "../utils/util";

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
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// hash password
UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);

  // generate code
  this.activateCode = generateCode();
});

// send email
UserSchema.post("save", async function (doc, next) {
  // get user
  const user = doc;

  const contentEmail = await renderEmail("registration-succes.ejs", {
    fullname: user.fullName,
    email: user.email,
    phone: user.phone,
    registeredAt: user.createdAt,
    activateCode: user.activateCode,
  });

  // send email
  await sendEmail(user.email, "Registration Success", contentEmail);

  // next
  next();
});

// model
const UserModel = model<IUser>("User", UserSchema);

// export
export default UserModel;
