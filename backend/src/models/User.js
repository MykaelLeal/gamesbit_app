import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: false,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  avatar: {
    type: String,
    required: false,
  },

  cpf: {
    type: String,
    unique: true,
    required: false,
  },

  phone: {
    type: String,
    required: false,
  },

  role: {
      type: String,
      enum: ["client", "admin"],
      default: "client",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", UserSchema);

export default User;