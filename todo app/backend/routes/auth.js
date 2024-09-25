const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(200).json({ message: "Please fill all the fields" });
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = new User({ username, email, password: hashPassword });
    await user
      .save()
      .then(() =>
        res.status(201).json({ message: "User registered successfully" })
      );
  } catch (error) {
    res.status(200).json({ message: "User already exists" });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await User.findOne({ email });
    if (!userLogin) {
      return res.status(200).json({ message: "Please Sign Up First" });
    } else if (userLogin) {
      const isMatch = bcrypt.compareSync(password, userLogin.password);
      if (!isMatch) {
        res.status(200).json({ message: "Incorrect Password" });
      } else {
        const { password, ...others } = userLogin._doc;
        res.status(200).json({ message: "User signed in successfully", others });
      }
    } else {
      res.status(200).json({ message: "User Already Exits" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
