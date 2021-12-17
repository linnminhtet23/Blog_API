const multer = require("multer");

const MIME_TYPE = {
    "image/jpg":"jpg",
    "image/png":"png",
    "image/jpeg":"jpeg"
};

const fileUpload = multer({
    limits: 50000,
    storage:multer.diskStorage({
        destination:(req,file, cb)=>{
            cb(null,"uploads");
        },
        filename:(req, file, cb)=>{
            const ext = MIME_TYPE[file.mimetype]
            cb(null, Date.now()+"."+ext);
        },
    }),
    fileFilter:(req, file, cb)=>{
        const isValid = !!MIME_TYPE[file.mimetype]; //false
        const error = isValid ? null: new Error("Please Upload Valid Filetypes");
        cb(error, isValid); // true null
    }
});

module.exports = fileUpload;