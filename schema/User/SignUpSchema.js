const { body } = require("express-validator");

const signUpSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Please Fill Your Name"),
  body("email").isEmail().withMessage("Please Fill Your Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
    body("confirmPassword").custom((value,{req})=>{

      // console.log({value, pw: req.body.password});
        if(value !== req.body.password){
            throw new Error("Password should be match");
        }
    
        return true;
    }),
    body("age").isNumeric().withMessage("Please fill your age"),
    body.apply("address").exists({checkFalsy: true}).withMessage("Please fill your address"),
    
];


module.exports =signUpSchema;