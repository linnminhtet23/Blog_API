const Blog = require("../models/blogModel");
const fs = require("fs");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user");

    res.status(200).send(blogs);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getPublicBlogs = async (req, res) => {
  //query localhost:3000/public?page=1&&limit=10
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const total = await Blog.countDocuments({ public: true });

    const pages = Math.ceil(total / limit);

    if (page > pages) {
      res.status(404).send("There is no page with this page number");
      return;
    }

    const blogs = await Blog.find({ public: true })
      .skip(skip)
      .limit(limit)
      .populate("user");

    res.send(blogs);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getPublicBlogDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { populate } = req.query;
    // const blog;
    if (populate) {
      const blog = await Blog.find({ public: true, _id: id }).populate("user");
    } else {
      const blog = await Blog.find({ public: true, _id: id });
    }

    res.send(blog);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createBlog = async (req, res) => {
  const { title, body, public, user } = req.body;

  try {
    const blog = new Blog({
      title,
      body,
      public,
      blogImage: req.file.path,
      user,
    });

    await blog.save();
    res.status(201).send(blog);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getMyBlogs = async (req, res) => {
  try {
    // console.log(req.user);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const total = await Blog.countDocuments({ public: true })
      .skip(skip)
      .limit(limit)
      .populate("user");

    const pages = Math.ceil(total / limit);

    if (page > pages) {
      res.status(404).send("There is no page with this page number");
      return;
    }

    const blogs = await Blog.findOne({ user: req.user._id });
    res.send(blogs);
  } catch (error) {
    res.sendStatus(500);
  }
};

const editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const {title, body, user } = req.body;
    const blogToEdit = await Blog.findOne({ _id: id, user: userId });

    req.body.blogImage = req.file ? req.file.path : blogToEdit.blogImage;

    if (req.file) {
      fs.unlinkSync(blogToEdit.blogImage);
    }

    const blog = await Blog.findOneAndUpdate(
      { _id: id, user: userId },
      { ...req.body, public: blogToEdit.public },
      { new: true }
    );
    res.send(blog);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteABlog = async (req, res) => {
  try {
    const { id } = req.params;

    // console.log(req.user._id);
    const blogToDelete = await Blog.findOne({ _id: id, user: req.user._id });
    fs.unlinkSync(blogToDelete.blogImage);

    await Blog.findOneAndDelete({ _id: id, user: req.user._id });

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};
const togglePublic = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const blogToEdit = await Blog.findOne({ _id: id, user: userId });

    blogToEdit.public = !blogToEdit.public;

    const blog = await blogToEdit.save();

    res.send(blog);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
module.exports = {
  createBlog,
  getAllBlogs,
  getPublicBlogs,
  getPublicBlogDetails,
  getMyBlogs,
  deleteABlog,
  togglePublic,
  editBlog,
};
