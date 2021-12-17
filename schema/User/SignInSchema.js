const { body } = require("express-validator");

const signInSchema = [
  body("email").isEmail().withMessage("Wrong Email and Password"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Wrong Email and Password"),  
];


module.exports =signInSchema;