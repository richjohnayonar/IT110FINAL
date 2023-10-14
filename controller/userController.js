const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const signup = async (req, res) => {
  try {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      await userModel.create({ email: req.body.email, password: hash });
      if (err) {
        console.log(err);
      } else {
        res.render("login.ejs");
      }
    });
  } catch (error) {
    res.status(500).json(error);
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
        res.render("newpage.ejs", { email: req.body.email });
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
  res.render("login.ejs");
};

const signupPage = (req, res) => {
  res.render("signup.ejs");
};
module.exports = {
  signup,
  login,
  loginPage,
  signupPage,
};
