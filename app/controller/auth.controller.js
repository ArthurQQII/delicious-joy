const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
//const Role = db.role;

// const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken"); 
var bcrypt = require("bcryptjs");

 // Save User to Database
exports.signup = async (req, res) => {
  const formData = req.body;
  if (!formData.email || !formData.password) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }
  const newUser = new User(formData);
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  newUser.save().then((doc) => res.status(201).send(doc));
};

exports.signin = async (req, res) => {
  const formData = req.body;
  if (!formData.email || !formData.password) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }
  const user = await User.findOne({ email: formData.email });
  if (user) {
    const validPassword = await bcrypt.compare(
      formData.password,
      user.password
    );
    if (validPassword) {
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).json({ message: "Valid password", accessToken: token });
    } else {
      res.status(401).json({ error: "Invalid Password" });
    }
  } else {
    return res.status(404).send({ message: "User Not found." });
  }
};
