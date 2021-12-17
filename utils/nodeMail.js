const nodemailer = require("nodemailer");
const config = require("../config")

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: config.MAIL_USER,
        pass: config.MAIL_PW
    }
});

module.exports= transporter;