const {body} = require("express-validator");

const changePwSchema = [
    body("prevPw").exists({checkFalsy: true}).withMessage("Please Fill Previous Password"),
    body("newPw").isLength({min:6}).withMessage("New Password should be at least 6 characters"),
    body("confirmPw").custom((value, {req})=>{
        if(value!== req.body.newPw){
            throw new Error("Passwords should be match");
        }
        return true;
    })
]

module.exports = changePwSchema;
