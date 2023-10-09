import { createTransport } from "nodemailer";
import Users from "../models/userModel.js";
// import crypto from "crypto";
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "rajashery68@gmail.com",
    pass: "ukbp wjbj upkm edpl",
  },
});

// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
let otpGenerated;

const forgotPassword = (req, res) => {
  const email = req.params.email;
  const user = Users.find(email);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  otpGenerated = generateOTP();
  // Users.findByIdAndUpdate(
  //   user._id,
  //   { otp: undefined },
  //   {
  //     new: true,
  //   }
  // );

  const mailOptions = {
    from: "rajashery68@gmail.com",
    to: email,
    subject: "Forgot Password OTP",
    text: `Your OTP for resetting your password is: ${otpGenerated}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error sending OTP", message: error.message });
    }

    res.status(200).json({ message: "OTP sent successfully" });
  });
};

//Controller function to confirm OTP and set a new password
const resetPassword = (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = Users.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (otpGenerated !== otp) {
    return res.status(401).json({ error: "Invalid OTP" });
  }
  user.password = newPassword;

  // Clear the OTP
  user.otp = undefined;
  Users.findByIdAndUpdate(
    user._id,
    { otp: undefined },
    {
      new: true,
    }
  );
  res.status(200).json({ message: "Password reset successful" });
};

export { forgotPassword, resetPassword };
