import { Schema, model, models } from "mongoose";
const UserScheme = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  avatar: {
    type: String,
    default: "https://djc4ts-3000.csb.app/logo.svg",
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  username: {
    type: String,
    default: `user${Math.floor(Math.random() * 1001)}`,
  },
  permissions: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", UserScheme);
export default User;
