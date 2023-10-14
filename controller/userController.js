const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Joi = require("joi");

const signup = async (req, res) => {
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const userInput = req.body;
  const { error } = userSchema.validate(userInput, { abortEarly: false });

  if (error) {
    const errors = {};
    error.details.forEach((err) => {
      errors[err.context.key] = err.message;
    });

    res.render("signup.ejs", { errors });
  } else {
    try {
      const hash = await bcrypt.hash(req.body.password, saltRounds);
      await userModel.create({ email: req.body.email, password: hash });
      res.render("login.ejs");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await userModel.findOne({ email: email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        res.render("newpage.ejs", { email: email });
      } else {
        res.render("login.ejs", { errorMessage: "Invalid password." });
      }
    } else {
      res.render("login.ejs", { errorMessage: "No user found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginPage = (req, res) => {
  res.render("login.ejs", { errorMessage: null });
};

const signupPage = (req, res) => {
  res.render("signup.ejs", { errors: null });
};
module.exports = {
  signup,
  login,
  loginPage,
  signupPage,
};
