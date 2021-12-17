const jwt = require("jsonwebtoken");

const generateToken = async(user)=>{
    const token = jwt.sign({_id:user.id}, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});

    await user.save();
    
    return token;
};

module.exports = generateToken;