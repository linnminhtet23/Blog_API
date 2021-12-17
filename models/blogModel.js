const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        title:{
            type:String,
            required: true,
            unique: true
        },
        body:{
            type:String,
            required: true,
        },
        blogImage:{
            type:String,
            required: true,
        },
        public:{
            type:Boolean,
            required: true,
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required: true
        }
    },{timestamps: true}
);


const Blog = mongoose.model("Blog", blogSchema);

module.exports= Blog;