const { body } = require("express-validator");

const blogEditSchema = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("Please Fill Blog title"),
  body("body").exists({checkFalsy: true}).withMessage("Please Fill Blog Body"),
  body("user").exists({checkFalsy: true}).withMessage("Please Fill User")
];


module.exports =blogEditSchema;