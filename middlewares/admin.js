const adminMiddleWare = async (req, res, next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
         res.status(401).send("You don't have permission");
    }
}

module.exports = adminMiddleWare;