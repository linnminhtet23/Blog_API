const { body } = require("express-validator");

const blogCreateSchema = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("Please Fill Blog title"),
  body("body").exists({checkFalsy: true}).withMessage("Please Fill Blog Body"),
  body("public").exists({checkFalsy: true}).withMessage("Please Fill Post Type"),
  body("user").exists({checkFalsy: true}).withMessage("Please Fill User")

];


module.exports =blogCreateSchema;