require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const sgMail = require("@sendgrid/mail");
const { User } = require("../../model");

const { SENDGRID_API_KEY, SENDGRID_EMAIL, HOST, PORT } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmailVerify = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: SENDGRID_EMAIL,
    subject: "Email verification",
    text: "Please, confirm your email address",
    html: `<strong>Please, confirm your email address POST http://${HOST}:${PORT}/api/users/verify/${verificationToken}</strong>`,
  };

  await sgMail.send(msg);
  return true;
};

const verification = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken, verify: false });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  await User.findByIdAndUpdate(
    { _id: user._id },
    { verificationToken: null, verify: true }
  );

  res.json({ message: "Verification successful" });
};

const verificationAgain = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email, verify: false });

  if (!user) {
    res.status(400).json({ message: "Verification has already been passed" });
    return;
  }

  const verificationToken = uuidv4();

  await User.findByIdAndUpdate({ _id: user._id }, { verificationToken });

  await sendEmailVerify(user.email, verificationToken);

  res.json({ message: "Verification email sent" });
};

module.exports = { sendEmailVerify, verification, verificationAgain };
