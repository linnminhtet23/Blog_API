const express = require("express");
const mongoose = require("mongoose");
const helmet  =require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRouter =require("./routes/userRoutes");
const blogRouter =  require("./routes/blogRoutes")
const path = require("path") 
require("dotenv").config();
//app initialize
const app =  express();
const PORT =  process.env.PORT||3000;

//testing route
// app.use("/",(req,res)=>{
//   res.send("This is testing server");
// });



 
//middlewares
app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());
app.use(express.json());


//routes
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);


//To render image
app.use("/upload", express.static(path.join(__dirname, "uploads")));

mongoose.connect("mongodb://localhost:27017/managementsystem").then(() => {
  console.log("db connected");
  app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
  });
});
