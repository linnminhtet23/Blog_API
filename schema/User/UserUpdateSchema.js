const {body} = require("express-validator");

const userUpdateSchema = [
    body("name")
    .exists({ checkFalsy: true })
    .withMessage("Please Fill Your Name"),
    body("email").isEmail().withMessage("Please fill valid email"),
    body("age").isNumeric().withMessage("Please fill your age"),
    body.apply("address").exists({checkFalsy: true}).withMessage("Please fill your address"),
    
]

module.exports = userUpdateSchema;