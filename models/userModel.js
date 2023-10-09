import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
});

const Users = mongoose.model("Users", userSchema);

export default Users;
