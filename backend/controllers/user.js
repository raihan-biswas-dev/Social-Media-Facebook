const User = require("../models/User.js");

const {
  validationEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation.js");

const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens.js");
const { sendVerificationEmail } = require("../helpers/mailer.js");

exports.register = async (req, res) => {
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    gender,
    bYear,
    bMonth,
    bDay,
  } = req.body;

  // email validation----------

  if (!validationEmail(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  // user validation-----------

  const check = await User.findOne({ email });

  if (check) {
    return res.status(400).json({
      message:
        "This email already exist, try different email address to continue",
    });
  }

  // text length check------

  if (!validateLength(first_name, 3, 30)) {
    return res
      .status(400)
      .json({ message: "First name must between 3 to 30 character" });
  }
  if (!validateLength(last_name, 3, 30)) {
    return res
      .status(400)
      .json({ message: "Last name must between 3 to 30 character" });
  }
  if (!validateLength(password, 6, 40)) {
    return res
      .status(400)
      .json({ message: "Password must be atlests 6 character" });
  }

  // passwod cryption---------

  const cryptedPassword = await bcrypt.hash(password, 12);

  // unique username generation

  const tempUsername = first_name + last_name;
  const newUsername = await validateUsername(tempUsername);

  const user = await new User({
    first_name,
    last_name,
    username: newUsername,
    email,
    password: cryptedPassword,
    gender,
    bYear,
    bMonth,
    bDay,
  }).save();

  const userId = user._id;

  const emailverificationToken = generateToken(userId);

  console.log(emailverificationToken);

  const url = `${process.env.BASE_URL}/activate/${emailverificationToken}`;

  if (user) {
    sendVerificationEmail(user.email, user.first_name, url);

    res.send({
      id: user._id,
      username: username,
      first_name: user.first_name,
      last_name: user.last_name,
      token: emailverificationToken,
      verified: user.verified,
      message: "Registr Success! Activate your email to start",
    });
  }
};

exports.activateAccount = async (req, res) => {
  const { token } = req.body;
};
