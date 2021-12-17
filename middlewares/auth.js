const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) {
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log({
    //   decoded
    // });
    const user = await User.findOne({
      id: decoded.id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(400).send("You are not authorized to access this endpoint");
  }
};


module.exports = authMiddleWare;
